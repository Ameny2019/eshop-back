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
    avatar: { type: String , default: `${process.env.BACKEND_URL}1667120445740.jpg`},
    isActivated : {type: Boolean, default: false},
    token: { type: String },
    verificationCode: { type: String },
  },
  { timestamps: true, versionKey: false }
);
module.exports = mongoose.model("user", schemaUser);







