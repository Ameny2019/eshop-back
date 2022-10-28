const Product = require("../Models/product");

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}