const routeHome = require("express").Router();
const homeController = require("../Controllers/homeController");


// Cloudinary file upload
// Link of tutorial: https://andela.com/insights/how-to-use-cloudinary-and-nodejs-to-upload-multiple-images/ 
// Vidéo tutorial: https://www.youtube.com/watch?v=zeWz_PZIwQg

const upload = require('../middelwares/upload');
const cloudinary = require('../middelwares/cloudinary');
const fs = require('fs');
// Route for upload a single image
routeHome.post('/upload-single', upload.single('image'), async (req, res) => {
    const uploader = async (path) => await cloudinary.uploads(path, 'Images'); 
    let data = {};
    if(req.file !== undefined){
        const {path} = req.file;
        data = await uploader(path);
        fs.unlinkSync(path);
    }
    res.json({
        message : 'This image uploaded successfully.',
        data: data
    })
});

// Route for upload multiple images 
routeHome.post('/upload', upload.array('image'), async (req, res) => {
    const uploader = async (path) => await cloudinary.uploads(path, 'Images');
    const files = req.files;
    const urls = [];
    for(const file of files){
        const {path} = file;
        const newPath = await uploader(path);
        urls.push(newPath);
        fs.unlinkSync(path);
    }
    res.json({
        message : 'Images uploaded successfully.',
        data: urls
    })
});

routeHome.get("/products", homeController.getProducts);
routeHome.get("/products/:id", homeController.getProductDetails);
routeHome.post("/contact", homeController.contact);

module.exports = routeHome;