const User = require("../Models/user");
const Token = require("../models/reset_token");
const crypto = require("crypto");
const sendEmail = require('../Utils/mail')

exports.forgetPassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email});
    if (!user) {
      res
        .status(400)
        .json({ message: "Cette adresse e-mail ne correspond à aucun utilisateur!" });
    } else {
      const existToken = await Token.findOne({ userId: user._id });
      if (existToken) {
        await Token.findByIdAndDelete(existToken._id);
      }
      // creating new token
      const resetToken = crypto.randomBytes(32).toString("hex");
      const tokenData = {
        userId: user._id,
        token: resetToken,
        createdAt: Date.now(),
      };
      await Token.create(tokenData);

      const dashboardURL = process.env.DASHBOARD_URL;
      const link = `${dashboardURL}auth/reset-password/${resetToken}`;

      await sendEmail(
        user.email,
        "Demande de réinitialisation de mot de passe",
        { name: user.firstName, link: link , dashboardLink : process.env.DASHBOARD_URL},
        "forgot_password.html"
      );
      res.json({ message: "E-mail de réinitialisation du mot de passe envoyé avec succès, veuillez vérifier votre courrier." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne dans le serveur!" });
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const passwordResetToken = await Token.findOne({ token: req.body.token });
    if (!passwordResetToken) {
        res.status(400).json({ message: "Le lien de réinitialisation de mot de passe invalide ou expiré." });
    } else {
        const diffDate = new Date() - passwordResetToken.createdAt;
        const diffSeconds = Math.floor(diffDate / 1000);
        if(diffSeconds < 3600)
        {
          const usertoUpdate = await User.findByIdAndUpdate(passwordResetToken.userId, { password: req.body.password}, { new: true })
          await sendEmail(
              usertoUpdate.email,
              "Réinitialisation du mot de passe avec succès",
              {
                  name: usertoUpdate.firstName,
                  dashboardLink : process.env.DASHBOARD_URL
              },
              "reset_password.html"
          );
          await Token.findByIdAndDelete(passwordResetToken._id);
          res.status(200).json({ message: "Votre mot de passe a été réinitialisé avec succès." });
        }else {
          await Token.findByIdAndDelete(passwordResetToken._id);
          res.status(400).json({ message: "Le lien de réinitialisation de mot de passe invalide ou expiré." });
        }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Erreur interne dans le serveur!" });
  }
};
