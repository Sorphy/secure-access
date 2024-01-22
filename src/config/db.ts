require("dotenv").config();
import { Sequelize, DataTypes } from "sequelize";

const POSTGRES_URL = process.env.DATABASE_URL as unknown as string;

const sequelize = new Sequelize(POSTGRES_URL);


/**======================SEQUELIZE CONNECTION========================== */
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
  } catch (error) {
    console.log("Unable to connect to database", error);
  }
}

export { connectDB, sequelize, Sequelize, DataTypes };