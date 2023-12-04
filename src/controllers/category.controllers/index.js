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
      const existingCategory = await Category.findUnique({
        where: {
          id: categoryId,
        },
      });

      if (!existingCategory)
        return res
          .status(404)
          .json({ error: true, message: "Category Not Found" });

      const existingLevel = await Level.findUnique({
        where: {
          id: levelId,
        },
      });

      if (!existingLevel)
        return res
          .status(404)
          .json({ error: true, message: "Level Not Found" });

      const createdCourse = await Course.create({
        data: {
          name: name,
          courseCode: courseCode,
          isPremium: Boolean(isPremium),
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
        error: false,
        message: "Create Course Successfully",
        data: createdCourse,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: true,
        message: "Internal Server Error",
      });
    }
  },

  // createCourse: async (req, res) => {
  //   let {
  //     name,
  //     courseCode,
  //     isPremium,
  //     categoryIds,
  //     levelIds,
  //     harga,
  //     description,
  //   } = req.body;

  //   const categoryIdArray = Array.isArray(categoryIds)
  //     ? categoryIds.map(Number)
  //     : [parseInt(categoryIds)];
  //   const levelIdArray = Array.isArray(levelIds)
  //     ? levelIds.map(Number)
  //     : [parseInt(levelIds)];

  //   try {
  //     const existingCategories = await Category.findMany({
  //       where: {
  //         id: { in: categoryIdArray },
  //       },
  //     });

  //     if (existingCategories.length !== categoryIdArray.length) {
  //       return res
  //         .status(404)
  //         .json({ error: true, message: "One or more categories not found" });
  //     }

  //     const existingLevels = await Level.findMany({
  //       where: {
  //         id: { in: levelIdArray },
  //       },
  //     });

  //     if (existingLevels.length !== levelIdArray.length) {
  //       return res
  //         .status(404)
  //         .json({ error: true, message: "One or more levels not found" });
  //     }

  //     const createdCourse = await Course.create({
  //       data: {
  //         name,
  //         courseCode,
  //         isPremium,
  //         harga,
  //         description,
  //         categories: {
  //           connect: categoryIdArray.map((categoryId) => ({ id: categoryId })),
  //         },
  //         levels: {
  //           connect: levelIdArray.map((levelId) => ({ id: levelId })),
  //         },
  //       },
  //     });

  //     return res.status(201).json({
  //       error: false,
  //       message: "Create Course Successfully",
  //       data: {
  //         course: createdCourse,
  //         categories: existingCategories,
  //         levels: existingLevels,
  //       },
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     return res.status(500).json({
  //       error,
  //     });
  //   }
  // },

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
      console.error(error);
      return res.status(500).json({
        error: true,
        message: "Internal Server Error",
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
      console.error(error);
      return res.status(500).json({
        error: true,
        message: "Internal Server Error",
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
      console.error(error);
      return res.status(500).json({
        error: true,
        message: "Internal Server Error",
      });
    }
  },
};
