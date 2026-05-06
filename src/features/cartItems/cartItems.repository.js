import { ObjectId } from "mongodb";
import { getDB } from "../../../config/mongodb.js";
class CartItemRepository {
    constructor() {
        //instead of hardcoding colloection every time define in constructor
        this.collection = "products"

    }
   async addItems(newCartItem) {
    try {
        const db = getDB();
        const collection = db.collection(this.collection);

        return await collection.updateOne(
            {
                productID: newCartItem.productID,
                userID: newCartItem.userID
            },
            {
                $inc: { quantity: Number(newCartItem.quantity) },
                $setOnInsert: {
                    productID: newCartItem.productID,
                    userID: newCartItem.userID
                }
            },
            {
                upsert: true
            }
        );

    } catch (err) {
        throw new Error("Something went wrong");
    }
}

    async getItems(userID) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
   return await collection.find({
            userID: userID
        }).toArray();

        } catch (err) {
            return res.status(500).json({
                message: err.message
            });
        }
    }

    //delete item of only that user
    async delete(cartItemID, userID) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
             const result = await collection.deleteOne({
            _id: new ObjectId(cartItemID),
            userID: userID   // ensure user owns item
        });
           if (result.deletedCount === 0) {
            return "Item not found";
        }         
        return null;

        } catch (err) {
                   throw new Error("Something went wrong");

        }
    }


}

export default CartItemRepository;