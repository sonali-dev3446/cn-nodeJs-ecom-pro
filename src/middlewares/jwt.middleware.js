import jwt from 'jsonwebtoken';

const jwtAuth = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    console.log(authHeader);

    if (!authHeader) {
        return res.status(401).send("Unauthorized");
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log(":::",payload);
        console.log("SECRET:", process.env.JWT_SECRET);
        req.user = payload;

        next();

    } catch (err) {
            console.log("JWT ERROR:", err.message);

        return res.status(401).send("Unauthorized");
    }
};

export default jwtAuth;