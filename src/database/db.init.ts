import mongoose from "mongoose";
import config from "../config/config";
import { DatabaseConnectionError } from "../errors/databaseConnection.errorrs";

mongoose.set("strictQuery", false);

export const connectDatabase = async () => {
  try {
    await mongoose.connect(config.mongoose.url);
    console.info("Database connected");
  } catch (error) {
    throw new DatabaseConnectionError();
  }
};
