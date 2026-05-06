import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import swagger from "swagger-ui-express";
import cors from 'cors';
// import ProductController from "./src/features/products/product.controller.js";
import  basicAuthorizer  from './src/middlewares/basicAuth.middleware.js';

import productRouter from "./src/features/products/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import cartRouter from "./src/features/cartItems/cartItems.routes.js";

import  bodyParser from 'body-parser';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import loggerMiddleware  from './src/middlewares/logger.moddleware.js';
import {connectToMongoDB} from './config/mongodb.js';
import fs from "fs";
import apiDocs from "./swagger.json" with { type: "json" };

//create server
const server = express();
// bellow manually confirure code for CORS policy configuration
// server.use((req,res, next) => {
//     res.header("Access-Control-Allow-Origin", 'http://localhost:4500')
//     res.header("Access-Control-Allow-Headers", '*')
//     res.header("Access-Control-Allow-Methods", '*')
//     // ' * ' - it means allow access to all the web client

//     // we need to return ok for preflight req
//     if(req.method == "OPTIONS") {
//         return res.sendStatus(200);
//     }
//     next();
// }) 

//CORS policy configuration using npm cors library
// provide anything specific you want
var corsOptions = {
    // origins: 'http://localhost:4500'
        origin: '*'   // allow all origins (good for testing)

}
server.use(cors(corsOptions));



server.use(express.json()) // as middleware its pass all the json data inside req body onj
server.use("/api-docs", swagger.serve, swagger.setup(apiDocs))
server.use(express.urlencoded({ extended: true }));
server.use('/api/users', userRouter)

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(loggerMiddleware);

//for all req  realated to product , redirect  to product routes.
// server.use('/api/products', basicAuthorizer, productRouter);// its basic authorization
server.use('/api/products', jwtAuth, productRouter);// its basic authorization
server.use('/api/cartItems', jwtAuth, cartRouter);// its basic authorization

server.use("/uploads", express.static("uploads"));

//default req handler
server.get("/", (req, res) => {
    res.send("welcome to E-Commerce API ")
})

//4. Middleware to handle 404  req.
server.use((req, res) => {
    res.status(404).send("API not found. Check /api-docs");
})

const PORT = process.env.PORT || 4500;

server.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
    connectToMongoDB();
})