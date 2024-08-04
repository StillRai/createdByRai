module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B3B3B', // Dark Gray
        'primary-light': '#565656', // Lighter Gray
        secondary: '#4F4F4F', // Mid Gray
        accent: '#A3A3A3', // Light Gray
        dark: '#1F1F1F', // Very Dark Gray
        light: '#F0E7DB', // Light Cream
        'button-dark': '#3B873E', // Dark Green
        'button-light': '#57A773', // Light Green
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
        slideIn: 'slideIn 0.5s ease-in-out',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
  variants: {
    extend: {
      backdropFilter: ['responsive'], 
    },
  },
}
