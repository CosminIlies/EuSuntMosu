module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {

      
    extend: {
      colors: {
        primary: "#cc0029",
        secondary: "#ededed",
        success:"#00cc4b",
        mobile_menu: "#dbdbdb",
      },
      animation:{
        bounce: 'bounce 1s ease-in-out infinite',

      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' }, 
          '50%': {transform: 'translateY(-25%)'}
        }
      }

      
    },
  },
  plugins: [],
}
