module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './src/projects/**/*.{html,js,jsx,ts,tsx}', 
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
        'custom-light': '#F5F5F5',
        'custom-dark': '#111A2C',
        'custom-yellow': '#DBDBA9',
        'custom-darkgreen': '#04BF9D',
        'custom-lightgreen': '#5BD963',
        'custom-pink': '#BF7ABB',
        'custom-purple': '#9F6AFF',
        'custom-gray': '#878787',
        'custom-darkblue': '#59A8D9',
        'custom-lightblue': '#85D3F2',
        'custom-orange': '#C8846C',
        'pastelBlue': '#AECBFA',
        'pastelPink': '#FFCCF9',
        'pastelGreen': '#C1F4C5',
        'pastelYellow': '#FFFFB5',
        'pastelPurple': '#D4A5FF',
        'custom-buttondark': '#3F3F3F',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        jetBrains: ['JetBrains Mono', 'monospace'],
        merriweather: ['Merriweather', 'serif'],
      },
      fontSize: {
        'h1-lg': '4rem',
        'h1-md': '3.5rem',
        'h1-sm': '2.5rem',
        'h2-lg': '4rem',
        'h2-md': '2.5rem',
        'h2-sm': '2rem',
        'h3-lg': '3rem',
        'h3-md': '2.5rem',
        'h3-sm': '2rem',
        'body-lg': '1.5rem',
        'body-md': '1rem',
        'body-sm': '0.8rem',
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
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
      display: ['group-hover'],
    },
  },
}
