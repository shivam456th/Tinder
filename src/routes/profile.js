const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { validationSignUpData } = require("../Utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    // res.send(user);
    res.json(user)
  } catch (error) {
    return res.status(500).send("ERROR : " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validationSignUpData(req)) {
      return res.status(400).send("Invalid Edit request");
    }

    const loggedInUser = req.user;
    console.log(loggedInUser);
  } catch (error) {
    return res.status(500).send("ERROR : " + error.message);
  }
});

module.exports = profileRouter;
