const productRepository = require('../Repository/ProductRepository')
const Estamp = require("../Models/estamp");
const Efleur = require('../Models/efleur');

exports.createProduct = async (req, res) => {
    try {
        const payload = {
            price: req.body.price,
            producType: req.body.producType,
            estamp: req.body.estamp,
            efleur: req.body.efleur,
        }
        const product = await productRepository.createProduct({
            ...payload
        });
        // approuve and update quantity
        let updatedQuery = { etatProduct: "OUI" };
        if (req.body.estamp !== undefined) {
            await Estamp.findByIdAndUpdate(req.params.subProductId, updatedQuery, { new: true })
        } else {
            await Efleur.findByIdAndUpdate(req.params.subProductId, updatedQuery, { new: true })
        }
        // return response
        res.status(200).json({
            status: true,
            message: 'Ce produit a été approuvé avec succès.',
            data: product,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}
exports.getProducts = async (req, res) => {
    try {
        let products = await productRepository.products();
        res.status(200).json({
            status: true,
            data: products,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}
exports.getProductById = async (req, res) => {
    try {
        let id = req.params.id
        let productDetails = await productRepository.productById(id);
        res.status(200).json({
            status: true,
            data: productDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}
exports.removeProduct = async (req, res) => {
    try {
        let id = req.params.id
        let productDetails = await productRepository.removeProduct(id)
        res.status(200).json({
            status: true,
            message: 'Le produit a été supprimé avec succès.',
            data: productDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
},
    exports.UpdateProduct = async function (req, res) {
        // try {
        let id = req.params.id
        let productDetails = await productRepository.updateProduct(id, req.body)
        res.json({ productDetails })
    }
