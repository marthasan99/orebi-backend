const express = require("express");
const dbConnection = require("./config/db");
const app = express();
const User = require("./model/user.js");
const emailValidation = require("./utilities/emailValidation.js");
const bcrypt = require("bcrypt");
const emailVerification = require("./utilities/emailvarification");
const verificationEmailTemplate = require("./utilities/VerificationEmailTemplate");
const token = require("./utilities/token.js");

require("dotenv").config();

dbConnection();

app.use(express.json());

app.post("/registration", async function (req, res) {
  const {
    firstName,
    lastName,
    email,
    telephone,
    addressOne,
    addressTwo,
    city,
    postCode,
    country,
    state,
    password,
  } = req.body;

  if (!firstName || !lastName) {
    return res.json({ error: "First Name and Last Name is required" });
  }
  if (emailValidation(email)) {
    return res.json({ error: "Valid email is required" });
  }
  let existingUserCheck = await User.find({ email });
  if (existingUserCheck.length > 0) {
    return res.json({ error: "Email already in use" });
  }
  bcrypt.hash(password, 10, async function (err, hash) {
    let user = new User({
      firstName,
      lastName,
      email,
      telephone,
      addressOne,
      addressTwo,
      city,
      postCode,
      country,
      state,
      password: hash,
    });

    user.save();
    let tokens = await token(user.email);
    emailVerification(
      user.email,
      "Verification Email",
      verificationEmailTemplate(tokens)
    );

    res.send(user);
  });
});

app.listen(8000);
