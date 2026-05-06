import CartItemRepository from './cartItems.repository.js';
import CartItemModel from './cartIems.model.js';
export default class CartItemController {
    constructor() {
        this.cartItemRepository = new CartItemRepository();
    }

    getItems = async (req, res) => {
        try {
            const userId= req.user.userID;
            const item = await this.cartItemRepository.getItems(userId);
            res.status(200).send(item);

        } catch (err) {
            return res.status(500).json({
                message: err.message
            });
        }
    }


    addItems = async (req, res) => {
        try {
            const { productID, quantity } = req.body;
            const userID = req.user.userID; // from token
            const newItem = new CartItemModel(
                productID,
                userID,
                quantity
            );
            const addNewItem = await this.cartItemRepository.addItems(newItem);
            res.status(201).json({
                success: true,
                message: "Product added successfully",
                productId: addNewItem.insertedId
            });
        } catch (err) {
            return res.status(500).json({
                message: err.message
            });
        }
    }

    //delete a items of users

    deleteItems = async (req, res) => {
        try {  
                        const userID = req.user.userID; // from token

            const cardItemID = req.params.id
             const error = await this.cartItemRepository.delete(cardItemID, userID);
              if (error) {
            return res.status(404).json({
                success: false,
                message: error
            });
        }
            return res.status(200).json({
            success: true,
            message: "Item deleted successfully"
        });

        } catch (err) {
            return res.status(404).json({
                message: err.message
            });
        }
    }

}