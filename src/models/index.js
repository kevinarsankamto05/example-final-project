const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = {
  user: prisma.User,
  role: prisma.Role,
  profile: prisma.Profile,
  Category: prisma.Category,
  Course: prisma.Course,
  Level: prisma.Level,
};
