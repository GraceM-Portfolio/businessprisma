import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        // Keeps Inter, but uses the Next.js optimized variable
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        
        // Keeps Playfair Display
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        
        // Maps the 'font-editorial' class you are using to Playfair Display
        editorial: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config