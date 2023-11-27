const dotEnv = require("dotenv");
dotEnv.config();

module.exports = {
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY,
};
