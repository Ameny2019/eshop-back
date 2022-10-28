const Product = require("../Models/product");

exports.getProducts = async (req, res) => {
    try {
        const estampsProducts = await Product.find({producType : 'estamp'})
        .sort({_id:"desc"})
        .populate({
            path: "estamp",
            model: "estamps"
        });

        const fleursProducts = await Product.find({producType : 'efleur'}).sort({_id:"desc"})
        .populate({
            path: "efleur",
            model: "efleur"
        });
        return res.status(200).json({fleursProducts, estampsProducts});
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