//@ts-check
import "dotenv/config";
import express from "express";
import cors from "cors";
import pkg from "body-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import https from "https"
import fs from "node:fs";

import authenticateToken  from './middleware/authenticateToken.js';
import { authenticateAdmin } from './middleware/authenticateAdmin.js';

import userRoutes from './routes/userRoutes.js';

import Database from "./logic/database.js";
import Utils from "./logic/utils.js";
import postRoutes from "./routes/postRoutes.js";

const { json } = pkg;
const app = express();
const corOptions = {
  origin: "*",
  methods: 'GET,POST', // Allowed methods
  allowedHeaders: 'Content-Type,Authorization',
  optionsSuccessStatus: 200,
}

export default class Server {
  db = new Database();
  utils = new Utils(this.db);

  constructor() {
    app.use(json());
    app.use(cors(corOptions));

    this.handle_events();
  }

  handle_events = () => {
    console.log("Attemping to Handling Requests");

    //User Routes
    app.use('/api/user', cors(corOptions), userRoutes(this.utils, this.db, process.env.SECRET, bcrypt, jwt));
    app.use('/api/posts', cors(corOptions), postRoutes(this.utils, this.db, process.env.SECRET));
  };

  start = () => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Running on https://${process.env.ADDRESS}:${process.env.PORT}`
      );
    });
  };
}
//https://yt3.googleusercontent.com/7x2-0ytnmRutv5id2TmfD71IaPzQyVoJPC4keywIsMg-66zqL8FyLZsdylvImFDM-EGZNTdgXQ=s160-c-k-c0x00ffffff-no-rj
