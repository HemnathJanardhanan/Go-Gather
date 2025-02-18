/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily:{
        nunito:['Nunito-Regular','sans-serif'],
        "nunito-medium":['Nunito-Medium','sans-serif'],
        "nunito-bold":['Nunito-Bold','sans-serif'],
        "nunito-ExtraBold":['Nunito-ExtraBold','sans-serif'],
        "nunito-SemiBold":['Nunito-SemiBold','sans-serif'],
        "nunito-Light":['Nunito-Light','sans-serif'],
        "nunito-ExtraLight":['Nunito-ExtraLight','sans-serif'],
      },
      colors:{
        primary: {
          100: '#4A628A0A', // Lightest shade
          200: '#4A628A1A', // Light
          300: '#4A628A', // Primary color
        },
        accent: {
          100: '#DFF2EB', // Lightest accent shade
          200: '#6F8DAB', // Light accent
          300: '#4A628A', // Accent color
        },
        black:{
          DEFAULT:'#000000',
          100:'#8C8E98',
          200:'#666876',
          300:'#191d31',
        },
        danger:'#F75555'
      }
    },
  },
  plugins: [],
}