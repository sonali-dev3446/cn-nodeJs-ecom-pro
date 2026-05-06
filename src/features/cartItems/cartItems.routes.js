//Manage Routes / path to productController

//1. import express
import express from 'express';
//2. Initilize express router.
import CartItemController from './cartItems.controller.js' 

// aim to set routes here that if that path match to call this controller
const cartRouter = express.Router();

// create object of class
const cartItemController = new CartItemController()

cartRouter.post("/", cartItemController.addItems);
cartRouter.get("/", cartItemController.getItems);
cartRouter.delete("/:id", cartItemController.deleteItems);

export default cartRouter;

//add
// {
//   "productID": "69f726e29fd0647bff775032",
//   "userID": "69f6fae1537cbb5a72b752db",
//   "quantity": 2
// }


//delete
//http://localhost:4500/api/cartItems/69f87409808b9e6afb657ef6