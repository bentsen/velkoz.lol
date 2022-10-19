/** @type {import('tailwindcss').Config} */
const {defaultTheme} = require("@nextui-org/react");
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'summoner-light': 'rgb(41,41,41)',
                'summoner-gray': 'rgb(142,150,161)',
                'summoner-dark': 'rgb(31,31,31)',
                'lol-color': 'rgb(24,87,145)',
                'valorant-color': 'rgb(253,75,89)',
                'tft-color': 'rgb(36, 45, 88)',
                'tft-color2': 'rgb(16, 24, 38)',
                'tft-dropdown-color': 'rgb(28, 34, 55)',
                'lor-color': 'rgb(231,133,200)',
                'navbar-color': 'rgb(13,13,13)',
                'default-color': 'rgb(49,49,60)',
                'button-color': 'rgb(41,53,77)',
                'loss-border': 'rgb(230,67,90)',
                'loss-button': 'rgb(111,61,72)',
                'match-border': 'rgb(41,41,41)',
                'match-panel': 'rgb(31,31,31)',
                'match-text': 'rgb(67,68,71)',
                'win': 'rgb(86,134,229)',
                'loss': 'rgb(230,67,90)',
                'game-hover': 'rgb(25, 25, 25)',
                'tft-blue': 'rgb(27, 63, 133)',
                'tft-pink': 'rgb(128,25,126)',
                'tft-gray': 'rgb(83,84,97)',
                'tft-green': 'rgb(51,102,60)',
                'tft-yellow': 'rgb(230,179,58)',
                'brand': {
                    400: 'hsl(222, 13%, 15%)',
                    600: 'hsl(240, 11%, 18%)',
                    800: 'hsl(230, 10%, 11%)',
                }
            },
            keyframes: {
                "slide-up-fade": {
                    "0%": { opacity: 0, transform: "translateY(2px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
                "slide-down-fade": {
                    "0%": { opacity: 0, transform: "translateY(-2px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
            },
            /**
             fontFamily: {
        'sans': ['Rajdhani', 'sans-serif'],
        'heading' : ['Roboto', 'sans-serif']
      }
             */
        },
        animation: {
            "slide-up-fade": "slide-up-fade 0.2s ease-in-out",
            "slide-down-fade": "slide-down-fade 0.2s ease-in-out",
        }
    },
    plugins: [
        require("tailwindcss-radix")({
            // Default: `radix`
            variantPrefix: "rdx",
        }),
    ],
}