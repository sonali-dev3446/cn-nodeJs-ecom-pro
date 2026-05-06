// user.model.js → Data Structure / Entity
export default class UserModel {
    constructor(name, email, password, type, id) {
        this.name = name
        this.email = email
        this.password = password
        this.type = type
        this.id = id
    }

    // static async signup(name, email, password, type) {
    //     try {
    //         //1. get teh database
    //         const db = getDB();

    //         //2. get the collection 
    //         const collection = db.collection("users");

    //         const newUser = {
    //             name,
    //             email,
    //             password,
    //             type
    //         };
    //         // these 2 steps for witout db connected
    //         // newUser.id = users.length + 1;
    //         // users.push(newUser);
    //         //3. Insert  the document.
    //         const result = await collection.insertOne(newUser); // this return promise we need to use async function.

    //         return {
    //             _id: result.insertedId,
    //             ...newUser
    //         };

    //     } catch (err) {
    //         throw new Error("Something went wrong");
    //     }
    // }

 

    static getAllUsers() {
        return users
    }

}

var users = [{
    "id": 1,
    "name": "Seller User",
    "email": "sellerUser@gmail.com",
    "password": "password",
    "type": "seller"
}]