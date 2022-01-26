import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";

import todoRoutes from './routes/todos';

const app = express();

app.use(express.json());

app.use(todoRoutes);


createConnection().then(() => {
  app.listen(5000, () => {
    console.log('Server started on port 5000');
  })
})
