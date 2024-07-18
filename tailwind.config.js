module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'custom-light': '#F5F5F5',
        'custom-dark': '#111A2C',
        'custom-yellow': '#F6AE2D',
        'custom-green': '#84DD63',
        'custom-pink': '#E91E63',
        'custom-purple': '#9F6AFF',
        'custom-gray': '#D9D9D9',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        jetBrains: ['JetBrains Mono', 'monospace'],
      },
      opacity: {
        15: '0.15',
      },
    },
  },
  plugins: [],
};
