const { default: mongoose } = require("mongoose");
const schemaUser = new mongoose.Schema(
  {
    nom: {
      type: String,
      trim: true,
    },
    adresse: {
      type: String,
    },
    tel: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      trim: true,
      default: 'Client'
    },
    avatar: { type: String , default: 'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'},
    isActivated : {type: Boolean, default: false},
    token: { type: String },
    verificationCode: { type: String },
  },
  { timestamps: true, versionKey: false }
);
module.exports = mongoose.model("user", schemaUser);







