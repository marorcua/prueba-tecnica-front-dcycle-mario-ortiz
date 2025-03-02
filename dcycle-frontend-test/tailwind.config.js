module.exports = {
  theme: {
    extend: {
      keyframes: {
        jump: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        jump: 'jump 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};
