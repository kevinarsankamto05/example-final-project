const { Course, Category, Level } = require("../../models");

module.exports = {
  createCourse: async (req, res) => {
    let {
      name,
      courseCode,
      isPremium,
      categoryId,
      levelId,
      harga,
      description,
    } = req.body;
    categoryId = parseInt(categoryId);
    levelId = parseInt(levelId);

    try {
      const courses = await Course.create({
        data: {
          name: name,
          courseCode: courseCode,
          isPremium: isPremium,
          harga: harga,
          description: description,
          category: {
            connect: { id: categoryId },
          },
          level: {
            connect: { id: levelId },
          },
        },
      });

      return res.status(201).json({
        data: courses,
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  },

  getAllCourses: async (req, res) => {
    try {
      const courses = await Course.findMany({
        include: {
          category: true,
          level: true,
        },
      });

      return res.status(200).json({
        data: courses,
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  },

  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.findMany();

      return res.status(200).json({
        data: categories,
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  },

  getAllLevels: async (req, res) => {
    try {
      const levels = await Level.findMany();

      return res.status(200).json({
        data: levels,
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  },
};
