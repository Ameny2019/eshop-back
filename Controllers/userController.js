
const User = require("../Models/user");
const bcrypt = require("bcryptjs");
const { randomBytes } = require("crypto");

module.exports = {
  CreateUser: async function (request, response) {
    // check email if not exist 
    const userFound = await User.findOne({
      email: request.body.email
    });
    if (userFound) {
      response.status(400)
        .json({ status: 400, message: "Cette adresse e-mail est déjà utilisée!" });
    } else {
      const newUser = {
        nom: request.body.nom,
        email: request.body.email,
        password: bcrypt.hashSync(request.body.password, 10),
        role: request.body.role,
        adresse:request.body.adresse,
        tel:request.body.tel,
        token:request.body.token,
        //avatar:request.file.filename,
        isActivated: true,
        verificationCode: randomBytes(6).toString("hex"),
      };
      User.create(newUser, (error, user) => {
      if (error) {
          response.status(500).json({
            message: error,
            status: 500,
          });
        }
         else {
          response.status(200).json({
            message: "L'utilisateur a été créer avec succès.",
            status: 200,
            data: user,
          });
        }
      });
    }
  },

  GetAllUsers: function (req, res) {
    User.find({})
      .exec((err, ListUsers) => {
        if (err) {
          res.status(500).json({
            message: "echec d'avoir la liste",
            status: 500,
          });
        } else {
          res.status(200).json({
            status: 200,
            message: "C'est la liste des utilisateurs",
            data: ListUsers,
          });
        }
      });
  },
  DeleteUser: function (req, res) {
    User.deleteOne({ _id: req.params.id }).exec((err, user) => {
      if (err) {
        res.status(500).json({
          message: err.message,
          status: 500,
        });
      } else {
        res.status(200).json({
          status: 200,
          message: "Utilisateur supprimé avec succès.",
          data: user,
        });
      }
    });
  },
  UpdateUser: function (req, res) {
    User.updateOne({ _id: req.params.id }, req.body).exec((err, userUpdate) => {
      if (err) {
        res.status(500).json({
          message: err.message,
          status: 500,
        });
      } else {
        res.status(200).json({
          status: 200,
          message: "utilisateur modifié !",
          data: userUpdate,
        });
      }
    });
  },
  GetUserByID: function (req, res) {
    User.findOne({ _id: req.params.id }).exec((err, userByid) => {
      if (err) {
        res.status(500).json({
          message: err.message,
          status: 500,
        });
      } else {
        res.status(200).json({
          status: 200,
          message: "utilisateur séléctonné par ID !",
          data: userByid,
        });
      }
    });
  },
};
