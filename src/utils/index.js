const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = require("../config");

module.exports = {
  verifyHashedData: async (unhashed, hashed) => {
    try {
      const match = await bcrypt.compare(unhashed, hashed);
      return match;
    } catch (err) {
      throw err;
    }
  },

  createJwt: (payload) => {
    try {
      return jwt.sign(payload, SECRET_KEY, { expiresIn: "6h" });
    } catch (error) {
      console.log(error);
    }
  },

  exclude: (model, keys) => {
    return Object.fromEntries(
      Object.entries(model).filter(([key]) => !keys.includes(key))
    );
  },

  apiSuccess: (msg, data) => {
    const response = {};
    response.error = false;
    response.message = msg;
    response.data = data;

    return response;
  },

  apiError: (msg) => {
    const response = {};
    response.error = true;
    response.message = msg;

    return response;
  },
};
