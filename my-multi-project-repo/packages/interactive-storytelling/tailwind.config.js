module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a73e8', // Bright blue
        'primary-light': '#4c8bf5', // Lighter blue
        secondary: '#ff4081', // Bright pink
        accent: '#fce4ec', // Light pink
        dark: '#263238', // Dark gray
        light: '#ffffff', // White
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out',
      },
    },
  },
  plugins: [],
}
