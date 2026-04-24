module.exports = {
  '/api': {
    target: process.env.BACK_URL,
    secure: false,
  },
};
