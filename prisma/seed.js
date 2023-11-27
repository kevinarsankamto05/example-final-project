const { PrismaClient } = require("@prisma/client");
const faker = require("@faker-js/faker/locale/id_ID");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const usedUserId = new Set();

async function seedData() {
  try {
    // Clear existing data
    await prisma.$transaction([
      prisma.user.deleteMany(),
      prisma.profile.deleteMany(),
      prisma.notification.deleteMany(),
      prisma.review.deleteMany(),
      prisma.transaction.deleteMany(),
      prisma.detailTransaction.deleteMany(),
      prisma.course.deleteMany(),
      prisma.category.deleteMany(),
      prisma.level.deleteMany(),
    ]);

    // Reset sequence IDs
    await prisma.$executeRaw`ALTER SEQUENCE "users_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "profiles_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "notifications_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "reviews_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "transactions_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "details_transactions_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "courses_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "categories_id_seq" RESTART WITH 1`;
    await prisma.$executeRaw`ALTER SEQUENCE "levels_id_seq" RESTART WITH 1`;

    // Seeding Users
    for (let i = 0; i < 10; i++) {
      const seedUser = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync("12345678", bcrypt.genSaltSync(10)),
        resetToken: faker.datatype.uuid(),
        verificationToken: faker.datatype.uuid(),
        roleId: faker.datatype.number({ min: 1, max: 3 }),
      };

      const user = await prisma.user.create({ data: seedUser });
      usedUserId.add(user.id);

      // (Rest of the seeding code remains the same)

      // Seeding Profiles
      const seedProfile = {
        name: faker.name.findName(),
        phone: faker.phone.phoneNumber(),
        picture: faker.image.avatar(),
        city: faker.address.city(),
        province: faker.address.state(),
        country: faker.address.country(),
        userId: user.id,
      };

      await prisma.profile.create({ data: seedProfile });

      // Seeding Notifications
      const seedNotification = {
        message: faker.lorem.sentence(),
        time: faker.date.recent(),
        isRead: faker.datatype.boolean(),
        userId: user.id,
      };

      await prisma.notification.create({ data: seedNotification });

      // Seeding Reviews
      const seedReview = {
        rating: faker.datatype.number({ min: 1, max: 5 }).toString(),
        feedback: faker.lorem.paragraph(),
        date: faker.date.recent(),
        userId: user.id,
        courseId: faker.datatype.number({ min: 1, max: 10 }),
      };

      await prisma.review.create({ data: seedReview });

      // Seeding Transactions
      const seedTransaction = {
        userId: user.id,
      };

      const transaction = await prisma.transaction.create({
        data: seedTransaction,
      });

      // Seeding DetailTransactions
      const seedDetailTransaction = {
        courseId: faker.datatype.number({ min: 1, max: 10 }),
        transactionId: transaction.id,
        paymentMethod: "PREMIUM",
        paymentStatus: faker.datatype.boolean(),
      };

      await prisma.detailTransaction.create({ data: seedDetailTransaction });
    }

    // Seeding Categories
    const categories = await prisma.category.createMany({
      data: Array.from({ length: 5 }).map(() => ({
        name: faker.random.word(),
      })),
    });

    // Seeding Levels
    const levels = await prisma.level.createMany({
      data: Array.from({ length: 5 }).map(() => ({
        name: faker.random.word(),
      })),
    });

    // Seeding Courses
    const courses = await prisma.course.createMany({
      data: Array.from({ length: 10 }).map(() => ({
        name: faker.random.words(),
        courseCode: faker.random.alphaNumeric(),
        isPremium: faker.datatype.boolean(),
        categoryId: faker.datatype.number({ min: 1, max: 5 }),
        levelId: faker.datatype.number({ min: 1, max: 5 }),
        price: faker.datatype.number({ min: 10, max: 100 }).toString(),
        description: faker.lorem.paragraph(),
      })),
    });

    console.log("Seeding completed!");
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

seedData();
