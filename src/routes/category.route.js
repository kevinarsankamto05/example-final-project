const express = require("express"),
  router = express.Router(),
  classControllers = require("../controllers/category.controllers");

router.get("/courses", classControllers.getAllCourses);
router.post("/courses", classControllers.createCourse);
router.get("/categories", classControllers.getAllCategories);
router.get("/levels", classControllers.getAllLevels);

module.exports = router;
