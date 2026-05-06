import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserRepository from "./user.repository.js";

export default class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }

    signup = async (req, res) => {
        try {

            const { name, email, password, type } = req.body;

            // hash password before saving
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new UserModel(name, email, hashedPassword, type);

            const savedUser = await this.userRepository.signup(user);

            // const user = await UserModel.signup(name, email, password, type);

            res.status(201).json(savedUser);

        } catch (err) {
            return res.status(500).json({
                message: err.message
            });
        }
    }
signin = async (req, res) => {
    try {
        // console.log("BODY:", req.body); // 🔥 debug

        if (!req.body) {
            return res.status(400).send("Request body missing");
        }

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Email and password required");
        }

        const result = await this.userRepository.signin(email);

        if (!result) {
            return res.status(401).send("Email not found");
        }

        const isMatch = await bcrypt.compare(password, result.password);

        if (!isMatch) {
            return res.status(401).send("Incorrect Credentials");
        }

        const token = jwt.sign(
            {
                userID: result._id,
                email: result.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "10h" }
        );

        return res.status(200).json({
            success: true,
            token
        });

    } catch (err) {
        console.log("ERROR:", err);
        return res.status(500).send(err.message);
    }
};
}