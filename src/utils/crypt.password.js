const bcrypt = require("bcrypt");

module.exports = {
  cryptPassword: async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  },
};
