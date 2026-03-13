import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        cream:    '#F5F0E8',
        charcoal: '#1A1A1A',
        stone:    '#8C8C8C',
        bone:     '#E8E0D0',
        sand:     '#C8B89A',
      },
      letterSpacing: {
        'widest-2': '0.3em',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
}
export default config