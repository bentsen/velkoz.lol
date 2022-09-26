/** @type {import('tailwindcss').Config} */
const {defaultTheme} = require("@nextui-org/react");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'summoner-light' : 'rgb(41,41,41)',
        'summoner-gray' : 'rgb(142,150,161)',
        'summoner-dark' : 'rgb(31,31,31)',
        'leagueoflegends-color' : 'rgb(24,87,145)',
        'valorant-color' : 'rgb(253,75,89)',
        'tft-color' : 'rgb(48,98,108)',
        'lor-color' : 'rgb(231,133,200)',
        'navbar-color' : 'rgb(13,13,13)',
        'default-color' : 'rgb(49,49,60)',
        'button-color' : 'rgb(41,53,77)',
        'loss-border' : 'rgb(230,67,90)',
        'loss': 'rgb(89,53,59)',
        'loss-button' : 'rgb(111,61,72)',
        'match-border' : 'rgb(41,41,41)',
        'match-panel' : 'rgb(31,31,31)',
        'match-text' : 'rgb(67,68,71)',
        'win' : 'rgb(86,134,229)',
        'loss' : 'rgb(230,67,90)',
        'game-hover' : 'rgb(25, 25, 25)',
      },
      fontFamily: {
        'sans': ['Rajdhani', 'sans-serif'],
        'heading' : ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}