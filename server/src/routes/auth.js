const express = require("express");
const { validationSignUpData } = require("../Utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validationSignUpData(req); // ✅ Corrected

    // Destructure values from body
    const { firstName, lastName, emailId, password } = req.body;

    const existingUser = await User.findOne({ emailId });

    if (existingUser) {
      return res.status(409).send("User with this email already exists");
    }

    // Encrypt password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // Create new user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    // Save user to DB
    await user.save();
    //Create a JWT Token
    const token = await jwt.sign({id:user._id}, "shivam123!@#", {expiresIn: "1hr"})

    // Add the token cookie and send the response back to the user

    res.cookie("token", token)
    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(404).send("Error saving the user: " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(404).send("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //Create a JWT Token
      // const token = await user.getJWT()
      const token = await jwt.sign({id:user._id}, "shivam123!@#", {expiresIn: "1hr"})

    // Add the token cookie and send the response back to the user

    res.cookie("token", token)
      res.status(200).json({message: "Login Successful",user});

    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send("ERROR:" + error.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(0),
  });
  res.send("Logout Successfully");
})

module.exports = authRouter;
