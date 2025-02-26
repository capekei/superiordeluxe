/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',    /* Azul oscuro profundo */
        secondary: '#F1F5F9',  /* Gris azulado claro */
        accent: '#e74c3c',     /* Rojo */
        text: '#0F172A',       /* Negro azulado */
        background: '#FFFFFF', /* Blanco puro */
        'accent-light': '#f5b7b1',
        'primary-light': '#1E293B',
        'secondary-light': '#F8FAFC'
      },
      fontFamily: {
        sans: ['Satoshi', 'system-ui', '-apple-system', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        fadeInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(10px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        slideIn: {
          '0%': { 
            opacity: '0',
            transform: 'translateX(-20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateX(0)'
          }
        },
        pulseSubtle: {
          '0%, 100%': { 
            transform: 'scale(1)',
            opacity: '1'
          },
          '50%': { 
            transform: 'scale(1.05)',
            opacity: '0.9'
          }
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' }
        },
        float: {
          '0%, 100%': { 
            transform: 'translateY(0)',
            filter: 'brightness(1)'
          },
          '50%': { 
            transform: 'translateY(-10px)',
            filter: 'brightness(1.1)'
          }
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'subtle': '0 2px 4px rgba(0,0,0,0.03)',
        'hover': '0 8px 16px rgba(0,0,0,0.05)',
        'accent': '0 4px 12px rgba(231,76,60,0.15)'
      }
    }
  },
  plugins: []
}
