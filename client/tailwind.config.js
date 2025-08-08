/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        // Welcome Section Animation
        welcomeEntrance: {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },

        // Premium Section Animations
        fadeInSlow: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
      },
      animation: {
        welcomeEntrance: 'welcomeEntrance 0.8s ease-out forwards',
        fadeInSlow: 'fadeInSlow 1.2s ease-out forwards',
      },
    },
    
  },
  plugins: [],
};
