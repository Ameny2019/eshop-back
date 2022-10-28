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
          name: req.body.firstName,
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

const logout = async (req, res) => {
  try {
    req.logout(); // Invoking logout() will remove the req.user property and clear the login session (if any).
    res.json({ message: "Vous êtes déconnecté avec succès." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erreur interne dans le serveur!" });
  }
};

module.exports = {
  register,
  activationAccount,
  login,
  logout,
}
// // const transporter = nodemailer.createTransport({
// //   service: "gmail",
// //   auth: {
// //     user: "rimtest43@gmail.com",
// //     pass: "rim44test**",
// //   },
// // });

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "testameny92@gmail.com",
//     pass: "Testameny2021",
//   },
// });

// function sendEmail(email, token) {
//   const mail = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'ameny.ouelhazi@gmail.com', // Your email id
//       pass: 'sticl1e2009' // Your password
//     }
//   });
//   const mailOptions = {
//     from: 'tutsmake@gmail.com',
//     to: email,
//     subject: 'Reset Password Link - Tutsmake.com',
//     html: '<p>You requested for reset password, kindly use this <a href="http://localhost:3000/reset-password?token=' + token + '">link</a> to reset your password</p>'
//   };
//   mail.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(1)
//     } else {
//       console.log(0)
//     }
//   });
// }

// module.exports = {
//   verifyEmail: async function (req, res) {
//     try {
//       // let verificationCode = req.params.verificationCode;
//       const { verificationCode } = req.params;

//       const user = await User.findOne({
//         verificationCode,
//       });
//       // console.log(user.fullname);
//       if (!user) {
//         return res.status(401).json({
//           status: 401,
//           message: "Unauthorized access, Invalid verification code",
//         });
//       }
//       user.verified = true;
//       user.verificationCode = undefined;
//       user.save();
//       return res.sendFile(
//         join(__dirname, "../Templates/verification_success.html")
//       );
//     } catch (error) {
//       res.sendFile(join(__dirname, "../Templates/errors.html"));
//     }
//   },

//   profile: async function (req, res) {
//     // return res.status(404).json({ message: "this my profile" });
//     try {
//       const user = req.user;
//       return res.status(200).json({ data: user });
//     } catch (error) {
//       return res.status(404).json({ message: error.message });
//     }
//   },

//   //************************************** */











//   //******************************** */
//   resetPassword: async function (req, res, next) {
//     const email = req.body.email;
//     console.log("email", email);

//     await User.findOne({ email: email }).exec((err, userByemail) => {
//       if (err) {
//         res.status(500).json({
//           message: err.message,
//           status: 500,
//         });
//       } else {
//         res.status(200).json({
//           status: 200,
//           message: "utilisateur séléctonné par email !",
//           data: userByemail,
//         });

//         const newToken = randtoken.generate(20);
//         // console.log("newtoken",newToken);
//         const sent = sendEmail(email, newToken);

//         if (sent != '0') {

//           const data = {
//             token: newToken
//           }
//           User.findOneAndUpdate(email, data)

//         }
//       }



//     });

//     // await   User.findOneAndUpdate(email,newToken).exec((err,userUpdated)=>{
//     //   if (err) {
//     //     res.status(500).json({
//     //       message: err.message,
//     //       status: 500,
//     //     });
//     //   } else {

//     //     res.status(200).json({
//     //       status: 200,
//     //       message: "email envoyé consuler email !",
//     //       data: userUpdated,
//     //     });
//     //   }
//     // });

//   }
// };