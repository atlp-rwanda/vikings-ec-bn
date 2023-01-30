import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import { sequelize } from "./database/models";
import router from "./routes/router";

dotenv.config();

const app = express();

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
        console.log("Database connection established successfully");
  } catch (err) {
        console.log(`Database connection failed: ${err}`);
    process.exit(1);
  }
};

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router)
export default app;
