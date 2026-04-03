/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,tsx,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                ios: {
                    blue: "#007AFF",
                    green: "#34C759",
                    red: "#FF3B30",
                    yellow: "#FFCC00",
                    gray: "#8E8E93",
                    black: "#000000",
                    white: "#FFFFFF",
                },
                android: {
                    primary: "#3DDC84",
                    secondary: "#4285F4",
                }
            },
            backdropBlur: {
                xs: "2px",
            },
            borderRadius: {
                'mobile': '40px',
            },
            animation: {
                'dock-hover': 'dock-scale 0.2s ease-out forwards',
            },
            keyframes: {
                'dock-scale': {
                    '0%': { transform: 'scale(1)' },
                    '100%': { transform: 'scale(1.2)' },
                }
            }
        },
    },
    plugins: [],
}