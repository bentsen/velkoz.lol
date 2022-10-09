/** @type {import('tailwindcss').Config} */
const {defaultTheme} = require("@nextui-org/react");
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    extend: {
      colors: {
        'summoner-light' : 'rgb(41,41,41)',
        'summoner-gray' : 'rgb(142,150,161)',
        'summoner-dark' : 'rgb(31,31,31)',
        'lol-color' : 'rgb(24,87,145)',
        'valorant-color' : 'rgb(253,75,89)',
        'tft-color' : 'rgb(36, 45, 88)',
        'tft-color2' : 'rgb(16, 24, 38)',
        'tft-dropdown-color' : 'rgb(28, 34, 55)',
        'lor-color' : 'rgb(231,133,200)',
        'navbar-color' : 'rgb(13,13,13)',
        'default-color' : 'rgb(49,49,60)',
        'button-color' : 'rgb(41,53,77)',
        'loss-border' : 'rgb(230,67,90)',
        'loss-button' : 'rgb(111,61,72)',
        'match-border' : 'rgb(41,41,41)',
        'match-panel' : 'rgb(31,31,31)',
        'match-text' : 'rgb(67,68,71)',
        'win' : 'rgb(86,134,229)',
        'loss' : 'rgb(230,67,90)',
        'game-hover' : 'rgb(25, 25, 25)',
        'tft-blue' : 'rgb(27, 63, 133)',
        'tft-pink' : 'rgb(128,25,126)',
        'tft-gray' : 'rgb(83,84,97)',
        'tft-green' : 'rgb(51,102,60)',
        'tft-yellow' : 'rgb(230,179,58)'
      },
        /**
      fontFamily: {
        'sans': ['Rajdhani', 'sans-serif'],
        'heading' : ['Roboto', 'sans-serif']
      }
         */
    },
  },
  plugins: [],
}