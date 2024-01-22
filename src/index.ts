import * as dotenv from 'dotenv'
import express, { Request, Response } from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import logger from "morgan";
import {connectDB, sequelize} from './config/db'
dotenv.config()
import userRouter from './routes/userRoute'
import assignRoleRouter from "./routes/assignRoleRoute";
const app = express()

app.use(cookieParser())
app.use(logger("dev"))
app.use(express.json())
app.use(
  cors({
    origin: "*",
  }))

  app.use('/users', userRouter)
  app.use("/admin", assignRoleRouter);

const port = process.env.PORT || 4000;

app.listen(port, async () => {
    console.log(`Server is running on port ${port}`);
    await connectDB();
    sequelize.sync({ force: false }).then(() => {
      console.log("Database synced successfully");
    });
});

export default app