import { Sequelize } from "sequelize";
import config from "config";

const db = config.get("dbConfig.DATABASE_NAME") || "";
const username = config.get("dbConfig.DB_USERNAME") || "";
const password = config.get("dbConfig.DB_PASSWORD") || "";
const host = config.get("dbConfig.DB_HOST") || "";

const sequelize = new Sequelize(db, username, password, {
  host: host,
  dialect: "postgres", // for mariadb we have to change this dialect to 'mariadb'
  logging: false,
});

// Test the database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

export default sequelize;
