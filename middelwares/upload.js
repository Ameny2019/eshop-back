const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./storages");
    },
    filename: (req, file, cb) => {
        const newFileName =  Date.now() + path.extname(file.originalname);
        cb(null , newFileName); 
    },
});
const fileFilter = (req, file, cb) => {
    const fileExention = path.extname(file.originalname);
    const allowedExtension = ['.jpg', '.png', '.gif', '.jpeg'];
    cb(null, allowedExtension.includes(fileExention))
};
const upload = multer({ storage: storage, fileFilter: fileFilter });
module.exports = upload;

