/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['"Roboto"', "sans-serif"],
      },
      colors: {
        textPrimary: '#121212',
        primaryBlueDark: '#388087',
        primaryBlueMedium: '#6FB3B8',
        primaryBlueLight: '#AAD7D9',
        primaryBlue: '#BADFE7',
        primaryGreen: '#C2EDCE',
        primaryWhite: '#FBF9F1',
        primaryGray: '#E5E1DA',
        primaryBlack: '#606d73',
        primaryGrayLight: '#F6F6F2',
        primaryYellow: '#F4F2DE',
        blueDarkPastel: '#1261A6',
        redPastel: '#FF6961',
        pinkPastel: '#D49E8D',
        greenPastel:'#A0CF9D',
        yellowPastel:'#FED797',
        blueDark: '#001C44'
      },
      boxShadow: {
        "focus-visible": "none",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
