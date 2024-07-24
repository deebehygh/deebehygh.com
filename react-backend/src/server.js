//@ts-check
import "dotenv/config";
import express from "express";
import cors from "cors";
import pkg from "body-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import authenticateToken  from './middleware/authenticateToken.js';
import { authenticateAdmin } from './middleware/authenticateAdmin.js';

import userRoutes from './routes/userRoutes.js';

import Database from "./logic/database.js";
import Utils from "./logic/utils.js";
import postRoutes from "./routes/postRoutes.js";

const { json } = pkg;
const app = express();

export default class Server {
  db = new Database();
  utils = new Utils(this.db);

  constructor() {
    app.use(json());
    app.use(cors());

    this.handle_events();
  }

  handle_events = () => {
    console.log("Attemping to Handling Requests");

    //User Routes
    app.use('/api/user', userRoutes(this.utils, this.db, process.env.SECRET, bcrypt, jwt));
    app.use('/api/admin/posts', postRoutes(this.utils, this.db, process.env.SECRET));
  };

  start = () => {
    app.listen(process.env.PORT, () => {
      console.log(
        `[DeeBeHygh BackEnd]: Online! Running on http://${process.env.ADDRESS}:${process.env.PORT}`
      );
    });
  };
}
