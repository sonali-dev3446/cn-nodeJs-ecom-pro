import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";
export default class ProductController {
    constructor() {
        this.productRepository = new ProductRepository();
    }
    getAllProducts = async (req, res) => {
        try {
            const products = await this.productRepository.getAll();
            res.status(200).send(products);
        } catch (err) {
            return res.status(500).json({
                message: err.message
            });
        }
    }


    addProduct = async (req, res) => {
        try {
            const { name, price, sizes } = req.body;
            const newProduct = new ProductModel(
                name,
                parseFloat(price),
                sizes.split(","),
                req.file.filename
            );
            const createdRecord = await this.productRepository.addProduct(newProduct)
            res.status(201).json({
                success: true,
                message: "Product added successfully",
                productId: createdRecord.insertedId
            });
        } catch (err) {
            return res.status(500).json({
                message: err.message
            });
        }
    }

    // sizes: sizes
    //         .split(",")
    //         .map(size => size.trim())
    //         .filter(size => size),

    getOneProduct = async (req, res) => {
        try {
            const id = req.params.id;
            const productFound = await this.productRepository.getById(id);
            if (!productFound) {
                res.status(401).send("Product not found.")
            } else {
                res.status(200).send(productFound);
            }
        } catch (err) {
            return res.status(500).json({
                message: err.message
            });
        }

    }
    // http://localhost:4500/api/products/filter?name=Laptop&minPrice=10&maxPrice=100&category=Category1
    filterProducts = async (req, res) => {
        try {
            const { name, minPrice, maxPrice, category } = req.query;

            const result = await this.productRepository.search(
                name,
                minPrice,
                maxPrice,
                category
            );
            return res.status(200).json(result);
        } catch (err) {
            return res.status(500).json({
                message: err.message
            });
        }
    }

   rateProducts = async (req, res) => {
    try {
        const { userID, productID, rating } = req.query;

        const error = await this.productRepository.rateProduct(
            userID,
            productID,
            rating
        );

        if (error) {
            return res.status(400).send(error);
        }

        return res.status(200).json({
            success: true,
            message: "Rating updated successfully"
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};
}