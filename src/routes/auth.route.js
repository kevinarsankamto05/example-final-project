const express = require("express"),
  schema = require("../validation/auth.schema"),
  validate = require("../middlewares/validation"),
  { verifyToken } = require("../middlewares/verfy.token"),
  controller = require("../controllers/auth.controllers/login"),
  router = express.Router();

/* AUTH Route */
router.post("/login", validate(schema.login), controller.login);
router.get("/me", verifyToken, controller.me);

module.exports = router;
