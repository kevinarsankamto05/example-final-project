const express = require("express"),
  router = express.Router(),
  schema = require("../validation/auth.schema"),
  validate = require("../middlewares/validation"),
  { verifyToken } = require("../middlewares/verfy.token"),
  authController = require("../controllers/auth.controllers/login"),
  registerController = require("../controllers/auth.controllers/register");

/* AUTH Route */
router.post("/register", registerController.register);
router.post("/login", validate(schema.login), authController.login);
router.get("/get", verifyToken, authController.get);

module.exports = router;
