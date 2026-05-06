//1. import express
import express from 'express';
import UserController  from './user.controller.js';

const userRouter = express.Router();
const userController = new UserController;

userRouter.post("/signin", userController.signin);
userRouter.post("/signup", userController.signup);
// userRouter.post("/signin", (req, res) =>  {
//     userController.signin(req, res)
// });


export default userRouter;