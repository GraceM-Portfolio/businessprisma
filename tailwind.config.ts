// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#112e25",    
          cream: "#f8f6f0",    
          peach: "#f4cfc3",    
          charcoal: "#1a1a1a", 
          light: "#f0eee6",    
        },
        prisma: {
          ivory: "#F8F6F1",
          cream: "#EFEAE1",
          espresso: "#332820",
          taupe: "#A99B8B",
          bronze: "#A17B56",
          charcoal: "#242321",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
};
export default config;
