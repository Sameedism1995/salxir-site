#!/usr/bin/env python3
"""
Salxir SEO metrics fetcher — Google Search Console + GA4.
Auth: service-account key at salxir-next/.google-sa.json (git/deploy-ignored).
Used by the weekly blog-post and twice-monthly SEO-audit scheduled tasks.

Usage:
  python3 scripts/seo-metrics.py gsc-queries [days]   # top search queries
  python3 scripts/seo-metrics.py gsc-pages   [days]   # top landing pages
  python3 scripts/seo-metrics.py gsc-totals  [days]   # clicks/impressions/ctr/pos
  python3 scripts/seo-metrics.py ga4         [days]   # users/sessions/pageviews
  python3 scripts/seo-metrics.py all         [days]   # everything, as JSON
Default days = 28. Output is JSON on stdout.
"""
import json, sys, datetime, os, urllib.request, urllib.error
from google.oauth2 import service_account
import google.auth.transport.requests as gt

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SA = os.path.join(HERE, ".google-sa.json")
SITE = "sc-domain:salxir.com"
GA4_PROPERTY = "538558897"
SCOPES = [
    "https://www.googleapis.com/auth/webmasters.readonly",
    "https://www.googleapis.com/auth/analytics.readonly",
]


def _token():
    creds = service_account.Credentials.from_service_account_file(SA, scopes=SCOPES)
    creds.refresh(gt.Request())
    return creds.token


def _post(url, body, tok):
    req = urllib.request.Request(
        url, data=json.dumps(body).encode(),
        headers={"Authorization": f"Bearer {tok}", "Content-Type": "application/json"},
    )
    return json.load(urllib.request.urlopen(req))


def _dates(days):
    end = datetime.date.today() - datetime.timedelta(days=3)  # GSC data lags ~2-3d
    start = end - datetime.timedelta(days=days)
    return str(start), str(end)


def gsc(dimension, days):
    tok = _token()
    start, end = _dates(days)
    body = {"startDate": start, "endDate": end, "rowLimit": 25}
    if dimension:
        body["dimensions"] = [dimension]
    url = f"https://searchconsole.googleapis.com/webmasters/v3/sites/{urllib.parse.quote(SITE, safe='')}/searchAnalytics/query"
    r = _post(url, body, tok)
    out = []
    for row in r.get("rows", []):
        out.append({
            "key": row["keys"][0] if dimension else "TOTAL",
            "clicks": row["clicks"], "impressions": row["impressions"],
            "ctr": round(row["ctr"], 4), "position": round(row["position"], 1),
        })
    return out


def ga4(days):
    tok = _token()
    body = {
        "dateRanges": [{"startDate": f"{days}daysAgo", "endDate": "today"}],
        "metrics": [{"name": m} for m in
                    ["activeUsers", "sessions", "screenPageViews", "conversions"]],
    }
    url = f"https://analyticsdata.googleapis.com/v1beta/properties/{GA4_PROPERTY}:runReport"
    try:
        r = _post(url, body, tok)
    except urllib.error.HTTPError as e:
        return {"error": e.read().decode()[:300]}
    rows = r.get("rows", [])
    if not rows:
        return {"activeUsers": 0, "sessions": 0, "screenPageViews": 0, "conversions": 0}
    v = rows[0]["metricValues"]
    return {"activeUsers": v[0]["value"], "sessions": v[1]["value"],
            "screenPageViews": v[2]["value"], "conversions": v[3]["value"]}


import urllib.parse  # noqa: E402

if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "all"
    days = int(sys.argv[2]) if len(sys.argv) > 2 else 28
    if cmd == "gsc-queries":
        print(json.dumps(gsc("query", days), indent=2))
    elif cmd == "gsc-pages":
        print(json.dumps(gsc("page", days), indent=2))
    elif cmd == "gsc-totals":
        print(json.dumps(gsc(None, days), indent=2))
    elif cmd == "ga4":
        print(json.dumps(ga4(days), indent=2))
    else:
        print(json.dumps({
            "window_days": days,
            "gsc_totals": gsc(None, days),
            "gsc_top_queries": gsc("query", days),
            "gsc_top_pages": gsc("page", days),
            "ga4": ga4(days),
        }, indent=2))
