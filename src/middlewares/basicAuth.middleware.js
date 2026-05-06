import UserModel from "../features/user/user.model.js";

const basicAuthorizer = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).send("No authorization details found");
    }

    if (!authHeader.startsWith("Basic ")) {
        return res.status(401).send("Invalid auth type");
    }

    const base64Credentials = authHeader.replace("Basic ", "").trim();

    const decodedCreds = Buffer
        .from(base64Credentials, "base64")
        .toString("utf8");

    const [email, password] = decodedCreds.split(":");

    const user = UserModel.getAllUsers().find(
        user =>
            user.email === email &&
            user.password === password
    );

    if (!user) {
        return res.status(401).send("Incorrect Credentials");
    }

    req.user = user; // optional

    next();
};

export default basicAuthorizer;