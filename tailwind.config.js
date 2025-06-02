/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'steel-gray': '#444444', // Primary accent
        'metallic-gold': '#D4AF37', // Secondary accent
        'off-white': '#F5F5F5', // Text color
        'rust': '#A64228', // Link hover
        'firebrick': '#8B0000', // Updated to match blood-red
        'viking-navy': '#1A1A1A', // Updated to match dark theme
      },
      backgroundColor: {
        'black': '#000000',
      },
      fontFamily: {
        'medieval': ['Uncial Antiqua', 'cursive'],
        'cinzel': ['Cinzel', 'serif'],
        'oswald': ['Oswald', 'sans-serif'],
        'lora': ['Lora', 'serif'],
      },
      boxShadow: {
        'gold': '0 0 20px rgba(212, 175, 55, 0.3)',
      },
      textShadow: {
        'gold': '2px 2px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(212, 175, 55, 0.3)',
      },
      dropShadow: {
        'gold': '0 0 12px rgba(212, 175, 55, 0.7)',
      },
      borderWidth: {
        '3': '3px',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#F5F5F5',
            h1: {
              color: '#D4AF37',
            },
            h2: {
              color: '#D4AF37',
            },
            h3: {
              color: '#D4AF37',
            },
            strong: {
              color: '#D4AF37',
            },
            a: {
              color: '#8B0000',
              '&:hover': {
                color: '#A64228',
              },
            },
            ul: {
              color: '#F5F5F5',
            },
            ol: {
              color: '#F5F5F5',
            },
            li: {
              color: '#F5F5F5',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};