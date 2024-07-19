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
        merriweather: ['Merriweather', 'serif'],
      },

      fontSize: {
        'h1-lg': '4rem',
        'h1-md': '3rem',
        'h1-sm': '2rem',

        'h2-lg': '3.5rem',
        'h2-md': '2.5rem',
        'h2-sm': '1.5rem',

        'h3-lg': '3rem',
        'h3-md': '2rem',
        'h3-sm': '1rem',
        
        'body-lg': '1.25rem',
        'body-md': '1rem',
        'body-sm': '0.875rem',
      },

      fontWeight: {
        'thin': '100',
        'extralight': '200',
        'light': '300',
        'regular': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
        'extrabold': '800',
        'black': '900',

      },
      opacity: {
        15: '0.15',
        10: '0.10',
        5: '0.05',
      },
    },
  },
  plugins: [],
};
