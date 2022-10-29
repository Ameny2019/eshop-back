const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  price: {
    type: String,
    required: [true, "Please include the product price"],
  },
  estamp: {
    type: mongoose.Types.ObjectId,
    ref: "estamp",
  },
  efleur: {
    type: mongoose.Types.ObjectId,
    ref: "efleur",
  },
  producType: {
    type: String,
  }
},
{
  timestamps: true,
  versionKey: false,
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;