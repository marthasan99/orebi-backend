const nodemailer = require("nodemailer");
async function emailVerification(email, subject, template) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: "OREBI",
    to: email,
    subject: subject,
    text: "Hello world?",
    html: template,
  });
}

module.exports = emailVerification;
