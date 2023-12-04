const express = require("express"),
  auth = require("./auth.route"),
  category = require("./category.route"),
  course = require("./review"),
  router = express.Router();

router.use(auth);
router.use(category);
router.use(course);

module.exports = router;
