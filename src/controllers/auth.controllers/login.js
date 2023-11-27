const { users } = require("../../models"),
  utils = require("../../utils");

module.exports = {
  login: async (req, res) => {
    try {
      const user = await users.findUnique({
        where: {
          email: req.body.email,
        },
      });

      if (!user)
        return res.status(200).json(utils.apiError("Email not registered"));

      const verifyPassword = await utils.verifyHashedData(
        req.body.password,
        user.password
      );

      if (!verifyPassword)
        return res.status(409).json(utils.apiError("Wrong Password"));

      const payload = { id: user.id, email: user.email };
      const token = utils.createJwt(payload);

      return res
        .status(200)
        .json(utils.apiSuccess("Login Successfully", token));
    } catch (error) {
      console.log(error);
      return res.status(500).json(utils.apiError("Internal Server Error"));
    }
  },

  me: async (req, res) => {
    try {
      const user = await users.findUnique({
        where: {
          id: res.user.id,
        },
      });

      const data = utils.exclude(user, ["password"]);

      return res
        .status(200)
        .json(utils.apiSuccess("Fetch Data Successfully", data));
    } catch (error) {
      console.log(error);
      return res.status(500).json(utils.apiError("Internal Server Error"));
    }
  },
};
