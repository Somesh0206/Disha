/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,jsx,mdx}',
    './src/components/**/*.{js,jsx,mdx}',
    './src/app/**/*.{js,jsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        hazard: {
          red: '#EF4444',
          'red-dark': '#991B1B',
          orange: '#F97316',
          yellow: '#EAB308',
          green: '#10B981',
          'green-dark': '#065F46',
          blue: '#0EA5E9',
        },
        slate: {
          850: '#151f32',
          900: '#0F172A',
          950: '#020617',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-fast': 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'radar-spin': 'spin 4s linear infinite',
        'float': 'float 3.5s ease-in-out infinite',
        'float-delayed': 'float 3.5s ease-in-out 1.75s infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'border-beam': 'borderBeam 6s linear infinite',
        'wave-bar': 'waveBar 1.2s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.8', filter: 'drop-shadow(0 0 15px rgba(239, 68, 68, 0.5))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 25px rgba(239, 68, 68, 0.8))' },
        },
        borderBeam: {
          '100%': { 'offset-distance': '100%' },
        },
        waveBar: {
          '0%, 100%': { height: '6px' },
          '50%': { height: '22px' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}

module.exports = config;
