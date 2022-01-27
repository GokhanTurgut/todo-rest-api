import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import dotenv from 'dotenv';

dotenv.config;

const PORT = Number(process.env.PORT) || 5000;

import todoRoutes from "./routes/todos";
import authRoutes from "./routes/auth";

createConnection().then(() => {
  const app = express();

  app.use(express.json());

  app.use(todoRoutes);
  app.use(authRoutes);

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
