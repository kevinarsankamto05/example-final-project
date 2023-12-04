const express = require("express"),
  router = express.Router(),
  controllers = require("../controllers/course.controllers/review");

router.post("/review", controllers.createReview);

module.exports = router;
