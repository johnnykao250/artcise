import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-libre)', 'Georgia', 'serif'],
      },
      colors: {
        cream: '#faf8f5',
        ink: '#1a1a1a',
        sage: '#6b7c6b',
        clay: '#8b7355',
        sandstone: '#c4a77d',
        graphite: '#4a4a4a',
      },
    },
  },
  plugins: [],
};
export default config;
