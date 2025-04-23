const jwt = require ('jsonwebtoken');
const User = require ('../models/user');

const userAuth = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if (!token) {
            throw new Error ("Token is Not Valid!!!!!")
        }
        const decodeObje = await jwt.verify(token, "DEV@Tinder$790")
        const {_id} = decodeObje;

        const user = await User.findById(_id);
        if (!user) {
            throw new Error ("User Not Found");
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(400).send("ERROR: " + error.message);  // ✅ return added
    }
}

module.exports = {userAuth}