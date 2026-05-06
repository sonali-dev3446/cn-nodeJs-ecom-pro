//user.repository.js → Database Operations
import { getDB } from "../../../config/mongodb.js";

class UserRepository {
    constructor() {
        //instead of hardcoding colloection every time define in constructor.
        //2. get the collection 

        this.collection = "users"

    }
    async signup(newUser) {
        try {
            //1. get teh database
            const db = getDB();
            //2. get the collection 
            const collection = db.collection(this.collection);

            //3. Insert  the document.
            const result = await collection.insertOne(newUser); // this return promise we need to use async function.

            return {
                _id: result.insertedId,
                ...newUser
            };

        } catch (err) {
            console.log("error::", err)
            throw new Error("Something went wrong");
        }
    }

    async signin(email) {
    try {
        //1. get teh database
        const db = getDB();

        //2. get the collection 
        const collection = db.collection(this.collection);

        //3. find user by email only
        return await collection.findOne({ email });

    } catch (err) {
        throw new Error("Something went wrong");
    }
}
}

export default UserRepository;