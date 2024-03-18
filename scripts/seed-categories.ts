const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Development" },
        { name: "Computer Schience" },
        { name: "Music" },
        { name: "Fitness" },
        { name: "Photographie" },
        { name: "Accounting" },
        { name: "Engeneering" },
        { name: "3D modeling" },
        { name: "Filming" },
        { name: "Design" },
        { name: "Marketing" },
      ],
    });
    console.log("Categories created succesfully !!!");
  } catch (error) {
    console.log("Error seeding database: ", error);
  } finally {
    await database.$disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
