// tailwind.config.js
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        animation: {
          shimmer: 'shimmer 2s infinite linear',
        },
        keyframes: {
          shimmer: {
            '0%': {
              backgroundPosition: '-100% 0',
            },
            '100%': {
              backgroundPosition: '200% 0',
            },
          },
        },
      },
    },
    plugins: [],
  };
  