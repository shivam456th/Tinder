const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../Utils/validation");

const express = require("express");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    // res.send(user);
    res.json(user);
  } catch (error) {
    return res.status(500).send("ERROR : " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      return res.status(400).send("Invalid Edit request");
    }

    const loggedInUser = req.user;
    // console.log(loggedInUser);
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    // console.log(loggedInUser);
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}, your profile updated Successfully`,
      data: loggedInUser,
    });
  } catch (error) {
    return res.status(500).send("ERROR : " + error.message);
  }
});

module.exports = profileRouter;
