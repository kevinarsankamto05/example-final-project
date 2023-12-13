const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const role1 = await prisma.role.create({ data: { name: "Admin" } });
  const role2 = await prisma.role.create({ data: { name: "User" } });

  const user1 = await prisma.user.create({
    data: {
      username: "admin1",
      email: "admin1@example.com",
      password: "admin123",
      roleId: role1.id,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "user1",
      email: "user1@example.com",
      password: "user123",
      roleId: role2.id,
    },
  });

  const category1 = await prisma.category.create({
    data: { name: "Programming", image: "kevin.jpg" },
  });
  const category2 = await prisma.category.create({ data: { name: "Design" } });

  const level1 = await prisma.level.create({ data: { name: "Beginner" } });
  const level2 = await prisma.level.create({ data: { name: "Intermediate" } });

  const course1 = await prisma.course.create({
    data: {
      name: "Introduction to JavaScript",
      courseCode: "JS101",
      isPremium: true,
      categoryId: category1.id,
      levelId: level1.id,
      harga: "49.99",
      description: "Learn the basics of JavaScript programming.",
    },
  });

  const course2 = await prisma.course.create({
    data: {
      name: "UI/UX Design Fundamentals",
      courseCode: "DES101",
      isPremium: false,
      categoryId: category2.id,
      levelId: level2.id,
      harga: "29.99",
      description: "Explore the principles of UI/UX design.",
    },
  });

  console.log("Data dummy telah ditambahkan ke dalam database.");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
