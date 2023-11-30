const { user, role, profile } = require("../../models");
const { cryptPassword } = require("../../utils/crypt.password");

module.exports = {
  register: async (req, res) => {
    const {
      username,
      email,
      password,
      roleId,
      name,
      phone,
      picture,
      city,
      province,
      country,
    } = req.body;

    try {
      const hashedPassword = await cryptPassword(password);

      const createdUser = await user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role: {
            connect: { id: roleId },
          },
          profile: {
            create: {
              name,
              phone,
              picture,
              city,
              province,
              country,
            },
          },
        },
        include: {
          profile: true,
        },
      });

      return res.status(201).json({
        data: createdUser,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error" });
    }
  },
};
