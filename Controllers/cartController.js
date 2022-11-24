const cartRepository = require('../Repository/cartRepository')
const productRepository = require('../Repository/ProductRepository');
const Product = require('../Models/product');
const Cart = require("../Models/cart");
const Estamp = require('../Models/estamp');
const Efleur = require('../Models/efleur');
const easyinvoice = require('easyinvoice');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const cloudinary = require('../middelwares/cloudinary');
const sendEmail = require('../Utils/mail');

exports.addItemToCart = async (req, res) => {
    console.log("here");
    productId = req.body.productId;
    console.log("hereEEE");
    const quantity = Number.parseInt(req.body.quantity);
    console.log("productId", productId)
    try {
        let cart = await cartRepository.getCarts();
        let productDetails = await productRepository.productById(productId);
        console.log("productDetails", productDetails)
        if (!productDetails) {

            return res.status(500).json({
                type: "Not Found",
                msg: "Invalid request"
            })
        }
        //--If Cart Exists ----
        if (cart) {
            //---- Check if index exists ----
            const indexFound = cart.items.findIndex(item => item.productId.id == productId);
            console.log("**************index**********", indexFound)
            if ((productDetails.producType) === "estamp") {
                // console.log("**************type**********",productDetails)
                console.log("**************Qantité disponible********", productDetails.estamp.QunatityEstampDisponible)
                console.log("***************Qantité demandée *********", quantity)
                if (quantity < productDetails.estamp.QunatityEstampDisponible) {
                    console.log("*****Qantité demandée estamp est accéptée vous pouvez continuer l'achat******")
                }
                //------This removes an item from the the cart if the quantity is set to zero, We can use this method to remove an item from the list  -------
                if (indexFound !== -1 && quantity <= 0) {
                    cart.items.splice(indexFound, 1);
                    if (cart.items.length == 0) {
                        cart.subTotal = 0;
                    } else {
                        cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                    }
                }
                //----------Check if product exist, just add the previous quantity with the new quantity and update the total price-------
                else if (indexFound !== -1) {
                    cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
                    cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
                    cart.items[indexFound].price = productDetails.price
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                //----Check if quantity is greater than 0 then add item to items array ----
                else if (quantity > 0 && quantity < productDetails.estamp.QunatityEstampDisponible) {
                    cart.items.push({
                        productId: productId,
                        quantity: quantity,
                        price: productDetails.price,
                        total: parseInt(productDetails.price * quantity)
                    })
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                //----If quantity of price is 0 throw the error -------
                else if (quantity > productDetails.estamp.QunatityEstampDisponible) {
                    return res.status(400).json({
                        type: "Invalid",
                        msg: "Invalid request"
                    })
                }
                let data = await cart.save();
                res.status(200).json({
                    type: "success",
                    mgs: "Process successful",
                    data: data
                })
            } else if ((productDetails.producType) === "efleur") {
                // console.log("**************type**********",productDetails)
                console.log("**************Qantité disponible********", productDetails.efleur.QunatityEfleurDisponible)
                console.log("***************Qantité demandée *********", quantity)
                if (quantity <= productDetails.efleur.QunatityEfleurDisponible) {
                    console.log("*****Qantité efleur demandée est accéptée vous pouvez continuer l'achat******")
                }
                //------This removes an item from the the cart if the quantity is set to zero, We can use this method to remove an item from the list  -------

                if (indexFound !== -1 && quantity <= 0) {
                    cart.items.splice(indexFound, 1);
                    if (cart.items.length == 0) {
                        cart.subTotal = 0;
                    } else {
                        cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                    }
                }
                //----------Check if product exist, just add the previous quantity with the new quantity and update the total price-------
                else if (indexFound !== -1) {
                    cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
                    cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
                    cart.items[indexFound].price = productDetails.price
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                //----Check if quantity is greater than 0 then add item to items array ----
                else if (quantity > 0 && quantity < productDetails.efleur.QunatityEfleurDisponible) {
                    cart.items.push({
                        productId: productId,
                        quantity: quantity,
                        price: productDetails.price,
                        total: parseInt(productDetails.price * quantity)
                    })
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                //----If quantity of price is 0 throw the error -------
                else if (quantity > productDetails.efleur.QunatityEfleurDisponible) {
                    return res.status(400).json({
                        type: "Invalid",
                        msg: "Invalid request"
                    })
                }
                let data = await cart.save();
                res.status(200).json({
                    type: "success",
                    mgs: "Process successful",
                    data: data
                })
            }

            //------------ This creates a new cart and then adds the item to the cart that has been created------------
            else {

                const cartData = {
                    items: [{
                        productId: productId,
                        quantity: quantity,
                        total: parseInt(productDetails.price * quantity),
                        price: productDetails.price
                    }],
                    subTotal: parseInt(productDetails.price * quantity)
                }
                cart = await cartRepository.addItem(cartData)
                // let data = await cart.save();
                res.json(cart);
            }
        }//rim

    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}
exports.getCarts = async (req, res) => {
    try {
        let cart = await cartRepository.getCarts();
        res.status(200).json({
            status: true,
            data: cart
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            message: "Something went wrong",
            err: err
        })
    }
}

exports.deleteCart = async (req, res) => {
    try {
        const cartFound = await Cart.findById(req.params.id);
        // Delete invoice from cloudinary
        if (cartFound.invoiceLink.includes('/invoices/')) {
          const assetName = cartFound.invoiceLink.slice(cartFound.invoiceLink.lastIndexOf('invoices'), cartFound.invoiceLink.lastIndexOf('.'))
          cloudinary.destroyAsset(assetName);
        }
        const data = await cartRepository.removeCartById(req.params.id);
        res.status(200).json({
            type: "success",
            message: "la commande a été supprimé avec succès.",
            data: data
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            message: "Something went wrong",
            err: err
        })
    }
}
exports.removeSingleProduct = async (req, res) => {


    idProd = req.params.id
    prodtoremove = await productRepository.productById(idProd)
    try {
        let cart = await cartRepository.getCarts();
        let productDetails = await productRepository.productById(idProd);
        console.log("prod", productDetails);
        const indexFound = cart.items.findIndex(item => item.productId.id == idProd);
        console.log("index", indexFound);
        if (indexFound !== -1) {
            cart.items.splice(indexFound, 1);
            if (cart.items.length == 0) {
                cart.subTotal = 0;
            } else {
                cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
            }

        } else {
            cart.items.splice(indexFound, 1);
            cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);

            // cart = await cartRepository.removeItem(prodtoremove)
            // console.log("okk",cart.subTotal);
        }
        let data = await cart.save();
        res.status(200).json({
            type: "success",
            mgs: "Item was removed from cart with success",
            data: data

        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}

exports.createCart = async (req, res) => {
    try {
        // Step 1: create cart
        const cart = await cartRepository.addItem(req.body);
        // Step 2: update stock
        req.body.items.map(async (item) => {
            const productFound = await Product.findById(item.idProduct);
            if (productFound) {
                if (productFound.producType === 'estamp') {
                    await Estamp.findByIdAndUpdate(productFound.estamp, { "$inc": { QunatityEstampDisponible: - item.quantity } }, { new: true })
                }
                if (productFound.producType === 'efleur') {
                    await Efleur.findByIdAndUpdate(productFound.efleur, { "$inc": { QunatityEfleurDisponible: - item.quantity } }, { new: true })
                }
            }
        });
        // Step 3: create pdf of invoice
        const currentDate = moment().format('DD-MM-YYYY');
        const dueDate = moment().format('DD-MM-YYYY');
        const products = req.body.items.map((item) => {
            return {
                "quantity": item.quantity,
                "description": item.product_name,
                "tax-rate": 0,
                "price": item.price
            }
        })
        const data = {
            // Customize enables you to provide your own templates
            // Please review the documentation for instructions and examples
            "customize": {
                //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
            },
            "images": {
                // The logo on top of your invoice
                "logo": "https://thd.tn/wp-content/uploads/2018/09/laposte.jpg", //"https://public.easyinvoice.cloud/img/logo_en_original.png",
                // The invoice background
                //"background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
            },
            // Your own data
            "sender": {
                "company": "Complexe postal de l’Ariana",
                "address": "2 Avenue Habib Bourguiba",
                "zip": "2080",
                "city": "Ariana",
                "country": "Tunisie",
                "custom1": "Téléphone: (+216) 71 719 579 - (+216) 71 713 936",
                "custom2": "E-mail: philatelie@poste.tn",
                "custom3": "Site Web: https://www.poste.tn/"
            },
            // Your recipient
            "client": {
                "company": req.user.nom,
                "address": req.user.adresse,
                "zip": req.user.tel,
                //"city": "Clientcity",
                //"country": "Clientcountry",
                // "custom1": "custom value 1",
                // "custom2": "custom value 2",
                // "custom3": "custom value 3"
            },
            "information": {
                // Invoice number
                "number": cart._id, //"2021.0001",
                // Invoice data
                "date": currentDate,
                // Invoice due date
                "due-date": dueDate // "31-12-2021"
            },
            // The products you would like to see on your invoice
            // Total values are being calculated automatically
            "products": products,
            // The message you would like to display on the bottom of your invoice
            "bottom-notice": "La poste tunisienne vous remercie pour votre confiance.",
            // Settings to customize your invoice
            "settings": {
                "locale": 'fr-FR', // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
                "currency": 'DTN', // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')
                "tax-notation": "TVA", // Defaults to 'vat'
                // "margin-top": 25, // Defaults to '25'
                // "margin-right": 25, // Defaults to '25'
                // "margin-left": 25, // Defaults to '25'
                // "margin-bottom": 25, // Defaults to '25'
                "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
                // "height": "1000px", // allowed units: mm, cm, in, px
                // "width": "500px", // allowed units: mm, cm, in, px
                // "orientation": "landscape", // portrait or landscape, defaults to portrait
            },
            // Translate your invoice to your preferred language
            "translate": {
                "invoice": "Facture",  // Default to 'INVOICE'
                "number": "Numéro", // Defaults to 'Number'
                "date": "Date", // Default to 'Date'
                "due-date": "Date d'échéance", // Defaults to 'Due Date'
                "subtotal": "Total partiel", // Defaults to 'Subtotal'
                "products": "Produits", // Defaults to 'Products'
                "quantity": "Quantité", // Default to 'Quantity'
                "price": "Prix", // Defaults to 'Price'
                "product-total": "Total", // Defaults to 'Total'
                "total": "Total" // Defaults to 'Total'
            },
        };
        const result = await easyinvoice.createInvoice(data);
        // The response will contain a base64 encoded PDF file
        // console.log('PDF base64 string: ', result.pdf);
        const invoicePath = path.resolve(`./storages/${cart._id}.pdf`);
        await fs.writeFileSync(invoicePath, result.pdf, 'base64');
        // Store invoice in cloudinary
        const uploader = async (path) => await cloudinary.uploads(path, 'invoices');
        const uploaderData = await uploader(invoicePath);
        fs.unlinkSync(invoicePath);
        // Get invoice link from cloudinary
        const invoiceLink =  uploaderData.url;
        await Cart.findByIdAndUpdate(cart._id, { invoiceLink }, { new: true })
        // Step 4: send invoice in mail
        await sendEmail(
            req.user.email,
            "Facture",
            {
                name: req.user.nom,
                dashboardLink : process.env.DASHBOARD_URL
            },
            "invoice_mail.html",
            [{
                filename: 'Facture.pdf',
                path: invoiceLink
            }]);
        // Step 5: return response
        res.json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur interne dans le serveur!" });
    }
}


//fin function
exports.updateCart = async (req, res) => {
    // const {
    //     productId
    // } = req.body;
    idProd = req.params.id
    console.log("id", idProd)
    const quantity = Number.parseInt(req.body.quantity);
    try {
        // console.log("kkk",quantity)
        let cart = await cartRepository.getCarts();

        let productDetails = await productRepository.productById(idProd);
        console.log("id", idProd)
        console.log("details", productDetails)
        console.log("quantity", quantity)

        const cartData = {
            items: [{
                productId: idProd,
                quantity: quantity,
                total: parseInt(productDetails.price * quantity),
                price: productDetails.price
            }],
            subTotal: parseInt(productDetails.price * quantity)
        }
        cart = await cartRepository.updateCart(cartData)
        res.json(cart);

    } catch (err) {
        console.log(err)
        res.status(400).json({
            type: "Invalid",
            msg: "Something went wrong",
            err: err
        })
    }
}


//
exports.getCartById = async (req, res) => {
    try {
        const id = req.params.id;
        const cartDetails = await cartRepository.getCartById(id);
        res.status(200).json({
            status: true,
            message: 'Récupération dde détails de commandes avec succès.',
            data: cartDetails,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: false,
            error: err
        })
    }
}
