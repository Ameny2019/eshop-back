const Product = require("../Models/product");
const Estamp = require("../Models/estamp");
const Efleur = require("../Models/efleur");

exports.products = async () => {
    const products = await Product.find().sort({_id:"desc"}).populate({
        path: "estamp",
        model: "estamps"
    }).populate({
        path: "efleur",
        model: "efleur"
    });;
    return products;
};
exports.productById = async id => {
    const product = await Product.findById(id).populate({
        path: "estamp",
        model: "estamps"
    }).populate({
        path: "efleur",
        model: "efleur"
    });;
    return product;
}
exports.createProduct = async payload => {
    const newProduct = await Product.create(payload);
    return newProduct
}
exports.removeProduct = async id => {
    const productFound  = await Product.findById(id);
    if(productFound !== null){
        if(productFound.producType === 'estamp'){
            await Estamp.findByIdAndDelete(productFound.estamp);
        }else{
            await Efleur.findByIdAndDelete(productFound.efleur);
        }
    }
    const product = await Product.findByIdAndRemove(id);
    return product
}
exports.updateProduct = async (id,data )=>{
    const product = await Product.findByIdAndUpdate(id,data).exec();
    return product
}