const Product = require("../Models/product");

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find().sort({_id:"desc"})
        .populate({
            path: "estamp",
            model: "estamps"
        }).populate({
            path: "efleur",
            model: "efleur"
        });
        return res.status(200).json(products);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}

exports.getProductDetails = async (req, res) => {
    try {
        const productFound = await Product.findById(req.params.id)
        .populate({
            path: "estamp",
            model: "estamps"
        }).populate({
            path: "efleur",
            model: "efleur"
        });
        if (productFound === null) {
            res.status(404).json({ message: "Produit non trouvé!" });
        } else {
            return res.status(200).json(productFound);
        }
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
}