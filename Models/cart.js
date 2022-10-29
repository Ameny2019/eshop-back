const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ItemSchema = new Schema({
    idProduct: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    producType: {
        type: String,
    },
    product_name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less then 1.']
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
    versionKey: false
})
const CartSchema = new Schema({
    items: [ItemSchema],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    subTotal: {
        default: 0,
        type: Number
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('cart', CartSchema);