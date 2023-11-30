const express = require("express"),
  auth = require("./auth.route"),
  category = require("./category.route"),
  router = express.Router();

router.use(auth);
router.use(category);

module.exports = router;
