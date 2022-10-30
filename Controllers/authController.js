const User = require("../Models/user");
const bcrypt = require("bcryptjs");
const { randomBytes } = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require('../Utils/mail');

const register = async (req, res) => {
  try {
    const userFound = await User.findOne({
      email: req.body.email
    });
    if (userFound) {
      res.status(400)
        .json({ status: 400, message: "Cette adresse e-mail est déjà utilisée!" });
    } else {
      const password = bcrypt.hashSync(req.body.password, 10);
      const newUser = new User({
        ...req.body,
        password,
        verificationCode: randomBytes(6).toString("hex"),
      });
      await newUser.save();
      // send email
      const link = `${process.env.DASHBOARD_URL}auth/account-activation/${newUser.verificationCode}`;
      await sendEmail(
        req.body.email,
        "Confirmation de votre compte",
        {
          name: req.body.nom,
          link: link,
          dashboardLink: process.env.DASHBOARD_URL
        },
        "account-confirmation.html"
      );
      // return response
      res.status(201).json({
        status: 201,
        message: "Votre inscription a été effectué avec succès et un e-mail de confirmation a été envoyé.",
      });
    }
  } catch (err) {
    res.status(406).json({ status: 406, message: err.message });
  }
}

const activationAccount = async (req, res) => {
  try {
    const userFound = await User.findOne({ verificationCode: req.params.code })
    if (userFound) {
      await User.findByIdAndUpdate(userFound._id, { isActivated: true }, { new: true });
      res.status(200).json({ message: 'Votre compte est maintenant activé.' })
    } else {
      res.status(400).json({ message: 'Le lien de confirmation est invalide.' })
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur interne dans le serveur!" });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ status: 400, message: "E-mail ou mot de passe uncorrect!" });
    } else {
      if (user.isActivated) {
        const passwordCompare = bcrypt.compareSync(password, user.password);
        if (!passwordCompare) {
          return res
            .status(400)
            .json({ status: 400, message: "E-mail ou mot de passe uncorrect!" });
        } else {
          // Creation de token
          const token = jwt.sign(
            {
              userId: user._id,
              email: user.email,
              role: user.role,
              username: user.nom,
              avatar: user.avatar,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRES_IN }
          );

          return res.status(200).json({
            token,
            message: "Bienvenue au portail E-shop by la poste tunisienne !",
            success: true,
          });
        }
      } else {
        return res
          .status(400)
          .json({ status: 400, message: "Votre compte n'est pas vérifier, veuillez consulter votre boite email pour confirmer votre compte!" });
      }
    }
  } catch (error) {
    res.status(404).json({ status: 404, message: error.message });
  }
}

const logout = async (req, res, next) => {
  try {
    // Invoking logout() will remove the req.user property and clear the login session (if any).
    req.logout((err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: "Erreur interne dans le serveur!" });
      } else {
        res.json({ message: "Vous êtes déconnecté avec succès." });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur interne dans le serveur!" });
  }
}

module.exports = {
  register,
  activationAccount,
  login,
  logout,
}