import sequelize from "../config/db.js";

async function initializeDatabase() {
  try {
    // Ensure sequelize is initialized and synced
    // await sequelize.sync({ force: true }); // drop and recreate tables with no data
    // await sequelize.sync({ alter: true }); // modify tables and attributes
    await sequelize.sync();
    console.log("Database sync successful");
  } catch (err) {
    console.error("Error syncing database:", err);
  }
}

export default initializeDatabase;
