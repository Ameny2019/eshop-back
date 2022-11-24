const { default: mongoose } = require("mongoose");
const schemaEstamps = new mongoose.Schema(
    {
        sujet: {
            type: String,
            trim: true,
        },
        photo: {
            type: String,
            required: true,
            default: 'http://res.cloudinary.com/dkkbwufyk/image/upload/v1669291051/images/hazzau7djmkr2ja0kd3a.jpg'
        },
        reference: {
            type: String,
        },
        format: {
            type: String,
            trim: true,
        },
        dateEmission: {
            Type: String,
        },
        serie: {
            Type: String,
        },
        artiste: {
            type: String,
            trim: true,

        },
        categorie: {
            type: mongoose.Types.ObjectId,
            ref: "categorie"
        },
        etatProduct: { type: String, default: 'NON' },
        //Ajouter la quantité disponible pour chaque object créer et pour le prix est ajouté dans le product
        QunatityEstampDisponible: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.']
        }
    },
    {
        timestamps: true,
        versionKey: false,
    });
module.exports = mongoose.model("estamps", schemaEstamps);