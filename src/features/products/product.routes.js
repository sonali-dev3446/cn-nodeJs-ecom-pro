//Manage Routes / path to productController

//1. import express
import express from 'express';
import ProductController from "./product.controller.js";
import { uploadFile } from "../../middlewares/fileUpload.middleware.js";
//2. Initilize express router.
// aim to set routes here that if that path match to call this controller
const productRouter = express.Router();

// create object of class
const productController = new ProductController();


//all the paths to controller methods.
//localhost/ap/products/
productRouter.get("/", productController.getAllProducts);
productRouter.get("/:id", productController.getOneProduct);

productRouter.post("/",
uploadFile.single('imageUrl'),
    productController.addProduct);// upload.array for upload multiple file

//http://localhost:4500/api/products/filter?name=Laptop&minPrice=10&maxPrice=100&category=Category1
productRouter.get("/filter", productController.filterProducts); 

productRouter.post("/rate", productController.rateProducts);

export default productRouter;


//http://localhost:4500/api/products/rate?userID=69f6fae1537cbb5a72b752db&productID=69f726e29fd0647bff775032&rating=4