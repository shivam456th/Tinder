const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Please Login!")
    }
    const decodeObje = await jwt.verify(token, "shivam123!@#");

    const { id } = decodeObje;

    const user = await User.findById(id);

    if (!user) {
      throw new Error("User Not Found");
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(400).send("ERROR: " + error.message); // ✅ return added
  }
};

module.exports = { userAuth };
