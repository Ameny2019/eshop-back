const { default: mongoose } = require("mongoose");
const SchemaEfleur = new mongoose.Schema(
    {
        nom: {
            type: String,
            trim: true,
        },
        photo: {
            type: String,
            required: true,
            default: 'http://res.cloudinary.com/dkkbwufyk/image/upload/v1669291051/images/hazzau7djmkr2ja0kd3a.jpg'
        },
        description: {
            type: String,
        },
        etatProduct: { type: String, default: 'NON' },
        QunatityEfleurDisponible: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.']
        }
    }, 
    {
    timestamps: true,
    versionKey: false,
});
module.exports = mongoose.model("efleur", SchemaEfleur);