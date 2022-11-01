const Cart = require("../Models/cart");
exports.getCarts = async () => {
    const carts = await Cart.find({})
        .populate({ path: 'user', select: 'nom' });
    return carts;
};

exports.removeCartById = async id => {
    const deleteCart = await Cart.findByIdAndDelete(id);
    return deleteCart;
}

exports.addItem = async payload => {
    const newItem = await Cart.create(payload);
    return newItem
};

exports.updateCart = async data => {
    const newCart = await Cart.updateOne(data);
    return newCart
}

exports.getCartById = async id => {
    const cart = await Cart.findById(id)
        .populate({ path: 'user', select: 'nom email tel adresse' })
        .populate({
            path: 'items',
            populate: {
                path: 'idProduct',
                model: 'Product'
            }
        });
    return cart;
}
