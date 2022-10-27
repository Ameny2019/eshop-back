const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

const sendEmail = (
  email,
  subject,
  mailPrams,
  templateFileName,
  attachments = []
) => {
  return new Promise(async (resolve, reject) => {
    try {
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MAIL,
          pass: process.env.PASSWORD,
        },
      });

      const template = fs.readFileSync(
        path.resolve("./Templates", templateFileName),
        { encoding: "utf-8" }
      );
      const html = ejs.render(template, mailPrams);

      const mailOptions = {
        from: process.env.MAIL,
        to: email,
        subject: subject,
        html: html,
        attachments: attachments,
      };

      // Send email
      const info = await transporter.sendMail(mailOptions);
      resolve(info);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = sendEmail;
