//import multer;

import multer from "multer";
import fs from "fs";


const storage = multer.diskStorage({
    destination: (req, file,cb) => {
        cb(null, './uploads/'); // uploads folder i want to store
    },
     filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

export const uploadFile = multer({ storage });