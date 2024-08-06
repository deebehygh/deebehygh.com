//@ts-check
import "dotenv/config";
import express from "express";
import cors from "cors";
import pkg from "body-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import https from "https"

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
    app.use(cors({ 
        origin: "https://185.151.30.216",
        methods: 'GET,POST', // Allowed methods
        allowedHeaders: 'Content-Type,Authorization',
      }));
    app.use(function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', 'https://185.151.30.216');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);
      console.log(`${req.method} request for '${req.url}'`);
      next();
    });
    app.options('*', (req, res) => {
      res.header('Access-Control-Allow-Origin', 'https://185.151.30.216');
      res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
      res.send();
    });
    this.handle_events();
  }

  handle_events = () => {
    console.log("Attemping to Handling Requests");

    //User Routes
    app.use('/api/user', userRoutes(this.utils, this.db, process.env.SECRET, bcrypt, jwt));
    app.use('/api/posts', postRoutes(this.utils, this.db, process.env.SECRET));
  };

  start = () => {
    app.listen(process.env.ADDRESS, process.env.PORT, () => {
      console.log(
        `Running on https://${process.env.ADDRESS}:${process.env.PORT}`
      );
    });
  };
}
//https://yt3.googleusercontent.com/7x2-0ytnmRutv5id2TmfD71IaPzQyVoJPC4keywIsMg-66zqL8FyLZsdylvImFDM-EGZNTdgXQ=s160-c-k-c0x00ffffff-no-rj