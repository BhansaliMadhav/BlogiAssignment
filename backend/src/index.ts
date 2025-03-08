import express from "express";
import morgan from "morgan";
import helmet, { crossOriginResourcePolicy } from "helmet";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";
import prisma from "./prisma/client";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import postRoutes from "./routes/postRoutes";
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const PORT = process.env.PORT || 9000;

prisma
  .$connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error Connecting to Database", err);
  });

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
