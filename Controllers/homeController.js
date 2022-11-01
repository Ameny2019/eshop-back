const Product = require("../Models/product");
const sendEmail = require('../Utils/mail');

exports.getProducts = async (req, res) => {
    try {
        const limit = req.query.limit ? Number.parseInt(req.query.limit) : 8;
        const estampsProducts = await Product.find({producType : 'estamp'})
        .limit(limit)
        .sort({_id:"desc"})
        .populate({
            path: "estamp",
            model: "estamps"
        });

        const fleursProducts = await Product.find({producType : 'efleur'})
        .limit(limit)
        .sort({_id:"desc"})
        .populate({
            path: "efleur",
            model: "efleur"
        });
        return res.status(200).json({fleursProducts, estampsProducts});
    } catch (error) {
        return res.status(500).json({ message: error.message });
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
        return res.status(500).json({ message: error.message });
    }
}

exports.contact = async (req, res) => {
    try {
        await sendEmail(
            process.env.SUPPORT_MAIL,
            `Contact Form: ${ req.body.subject}`,
            {
              name: req.body.name,
              email: req.body.email,
              message: req.body.message,
              dashboardLink: process.env.DASHBOARD_URL
            },
            "contact-support.html"
          );
        return res.status(200).json({
            status: 200,
            message: 'Merci pour votre contact, nous revenions vers vous dans les plus brefs délais.'
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}