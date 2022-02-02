import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config;

const PORT = Number(process.env.PORT) || 5000;

import todoRoutes from "./routes/todos";
import authRoutes from "./routes/auth";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/todo", todoRoutes);
app.use("/auth", authRoutes);

createConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
