#!/usr/bin/env node
// Non-interactive Vercel production deploy for salxir-next.
// Uses only Node built-ins + a Vercel token — no Vercel CLI required.
//
// Token resolution (first found wins):
//   1) env VERCEL_TOKEN
//   2) salxir-next/.vercel-deploy.local   (a single line: VERCEL_TOKEN=xxxxx)
//
// Deploys the current working tree to the existing project defined in
// .vercel/project.json, targeting production. Vercel dedupes files by SHA,
// so only new/changed files are uploaded (usually just the new blog post).
//
// Usage:  node scripts/vercel-deploy.mjs [--dry]
//   --dry : list the files + hashes that would be deployed, no network calls.

import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DRY = process.argv.includes('--dry');
const API = 'https://api.vercel.com';

// ---- token ----------------------------------------------------------------
function loadToken() {
  if (process.env.VERCEL_TOKEN) return process.env.VERCEL_TOKEN.trim();
  const f = join(ROOT, '.vercel-deploy.local');
  if (existsSync(f)) {
    const line = readFileSync(f, 'utf8').split('\n').find(l => l.includes('VERCEL_TOKEN'));
    if (line) return line.split('=').slice(1).join('=').trim().replace(/^["']|["']$/g, '');
  }
  return null;
}

// ---- project ----------------------------------------------------------------
function loadProject() {
  const p = JSON.parse(readFileSync(join(ROOT, '.vercel', 'project.json'), 'utf8'));
  return { projectId: p.projectId, orgId: p.orgId };
}

// ---- file walk --------------------------------------------------------------
const EXCLUDE_DIRS = new Set(['node_modules', '.next', '.git', '.vercel', '.deploy-tools', 'out', 'build']);
const EXCLUDE_FILE = (rel) =>
  rel.endsWith('.tsbuildinfo') ||
  rel === 'bld.log' ||
  /(^|\/)\.env(\..*)?$/.test(rel) ||          // any .env* file
  rel.startsWith('.vercel-deploy') ||
  rel === '.DS_Store';

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    const rel = relative(ROOT, abs).split('\\').join('/');
    const st = statSync(abs);
    if (st.isDirectory()) {
      if (EXCLUDE_DIRS.has(name)) continue;
      walk(abs, out);
    } else if (st.isFile()) {
      if (EXCLUDE_FILE(rel)) continue;
      out.push({ abs, rel });
    }
  }
  return out;
}

function sha1(buf) { return createHash('sha1').update(buf).digest('hex'); }

// ---- main -------------------------------------------------------------------
async function main() {
  const files = walk(ROOT).map(f => {
    const data = readFileSync(f.abs);
    return { file: f.rel, sha: sha1(data), size: data.length, data };
  });

  if (DRY) {
    let total = 0;
    for (const f of files) { total += f.size; console.log(`${f.sha}  ${String(f.size).padStart(9)}  ${f.file}`); }
    console.log(`\n${files.length} files, ${(total / 1e6).toFixed(2)} MB total`);
    return;
  }

  const token = loadToken();
  if (!token) {
    console.error('ERROR: no Vercel token found. Set env VERCEL_TOKEN or create salxir-next/.vercel-deploy.local with:\n  VERCEL_TOKEN=your_token_here');
    process.exit(2);
  }
  const { projectId, orgId } = loadProject();
  const auth = { Authorization: `Bearer ${token}` };
  const q = `?teamId=${orgId}`;
  const bySha = new Map(files.map(f => [f.sha, f]));

  async function uploadShas(shas) {
    const uniq = [...new Set(shas)];
    let bytes = 0;
    for (const sha of uniq) {
      const f = bySha.get(sha);
      if (!f) continue;
      const res = await fetch(`${API}/v2/files${q}`, {
        method: 'POST',
        headers: { ...auth, 'Content-Type': 'application/octet-stream', 'x-vercel-digest': sha },
        body: f.data,
      });
      if (!res.ok && res.status !== 409) {
        throw new Error(`file upload failed (${res.status}) for ${f.file}: ${await res.text()}`);
      }
      bytes += f.size;
    }
    return { count: uniq.length, bytes };
  }

  async function createDeployment() {
    const body = {
      name: 'salxir-next',
      project: projectId,
      target: 'production',
      files: files.map(f => ({ file: f.file, sha: f.sha, size: f.size })),
      projectSettings: { framework: 'nextjs' },
    };
    const res = await fetch(`${API}/v13/deployments${q}&skipAutoDetectionConfirmation=1`, {
      method: 'POST',
      headers: { ...auth, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return { res, json: await res.json() };
  }

  // Try to create the deployment referencing files by SHA. Vercel already has
  // assets from prior deploys, so it only asks for the new/changed ones.
  let { res, json } = await createDeployment();
  if (!res.ok && (json?.error?.code === 'missing_files' || Array.isArray(json?.error?.missing))) {
    const missing = json.error.missing || [];
    const up = await uploadShas(missing);
    console.log(`Uploaded ${up.count} new file(s), ${(up.bytes / 1e6).toFixed(2)} MB.`);
    ({ res, json } = await createDeployment());
  }
  if (!res.ok) {
    console.error('ERROR creating deployment:', JSON.stringify(json.error || json, null, 2));
    process.exit(1);
  }
  const id = json.id || json.uid;
  const url = json.url ? `https://${json.url}` : '(pending)';
  console.log(`Deployment created: ${id}`);
  console.log(`Preview URL: ${url}`);
  console.log(`Inspect: ${json.inspectorUrl || ''}`);

  // 3) Poll briefly for a quick failure; otherwise report that build continues.
  const deadline = Date.now() + 25000;
  let state = json.readyState || json.status || 'QUEUED';
  while (Date.now() < deadline && !['READY', 'ERROR', 'CANCELED'].includes(state)) {
    await new Promise(r => setTimeout(r, 4000));
    const s = await fetch(`${API}/v13/deployments/${id}${q}`, { headers: auth });
    if (s.ok) { const sj = await s.json(); state = sj.readyState || sj.status || state; }
  }
  console.log(`State: ${state}`);
  if (state === 'ERROR') process.exit(1);
  // READY or still building (build finishes server-side regardless of this script).
}

main().catch(e => { console.error('DEPLOY FAILED:', e.message); process.exit(1); });
