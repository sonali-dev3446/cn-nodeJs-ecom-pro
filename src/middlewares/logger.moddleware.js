
//purpose:
//Logs help companies understand usage on their servers.(typically records server requests such as:)

//POST /login  - GET /products?search=laptop
//usefull for - debugging , analytics, security audits, performance monitoring
import fs from "fs";

const fsPromise = fs.promises;

// Function to write logs
async function log(logData) {
    try {
        const finalLog =
            new Date().toString() +
            " | Log Data: " +
            JSON.stringify(logData) +
            "\n";

        await fsPromise.appendFile("log.txt", finalLog);

    } catch (err) {
        console.log(err);
    }
}

// Middleware
const loggerMiddleware = async (req, res, next) => {
    //log request data
    if(!req.url.includes("signin")) {  // we do'nt want to log cred
    await log(req.body);
    }

    next();
};

export default loggerMiddleware;