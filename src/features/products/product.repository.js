import { ObjectId } from "mongodb";
import { getDB } from "../../../config/mongodb.js";
class ProductRepository {
    constructor() {
        //instead of hardcoding colloection every time define in constructor
        this.collection = "products"

    }
    async getAll() {
        try {
            //1. get the database
            const db = getDB();

            //2. get the collection 
            const collection = db.collection(this.collection);
            //3. find  the document.
            return await collection.find().toArray();

        } catch (err) {
            throw new Error("Something went wrong");
        }
    }
    
    async addProduct(newProduct) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            //3. insert  the document.
            return await collection.insertOne(newProduct);

        } catch (err) {
            throw new Error("Something went wrong");
        }
    }


    async getById(id) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            //3. find  the document.
            // here we need to convert id into objectID becoz in db its accepecting as objectID 
            return await collection.findOne({ _id: new ObjectId(id) })

        } catch (err) {
            throw new Error("Something went wrong");
        }
    }

  async search(name, minPrice, maxPrice, category){
    try {
        const db = getDB();
        const collection = db.collection(this.collection);

        let filter = {};

        // name search
        if (name) {
            filter.name = {
                $regex: name,
                $options: "i"
            };
        }

        // price range
        if (minPrice || maxPrice) {
            filter.price = {};

            if (minPrice) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        // category exact match
        if (category) {
            filter.category = {
                $regex: `^${category}$`,
                $options: "i"
            };
        }

        return await collection.find(filter).toArray();

    } catch (err) {
        throw new Error("Something went wrong");
    }
}


    async rateProduct(userID, productID, rating) {
        try {
            const db = getDB();

            // validate user
            const user = await db.collection("users").findOne({
                _id: new ObjectId(userID)
            });

            if (!user) {
                return "User not found";
            }

            // validate product
            const product = await db.collection(this.collection).findOne({
                _id: new ObjectId(productID)
            });
            if (!product) {
                return "Product not found";
            }

            const ratings = product.ratings || [];
            
            // 3. check if any rating , if not then add ratings array.
            const existingIndex = ratings.findIndex(
                (r) => String(r.userID) === String(userID)
            );

            if (existingIndex >= 0) {
                // update rating
                ratings[existingIndex].rating = Number(rating);
            } else {
                // add new rating
                ratings.push({
                    userID,
                    rating: Number(rating)
                });
            }

            await db.collection(this.collection).updateOne(
                { _id: new ObjectId(productID) },
                {
                    $set: { ratings: ratings }
                }
            );

            return null;

        } catch (err) {
            throw new Error("Something went wrong");
        }
    }}

export default ProductRepository;