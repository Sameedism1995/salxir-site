import type { Config } from 'tailwindcss';

const config: Config = {
  // Preflight is disabled so Tailwind never overrides the original hand-tuned
  // stylesheet — guaranteeing the migrated site is pixel-identical.
  corePlugins: { preflight: false },
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'Poppins', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
