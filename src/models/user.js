const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    emailId: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    age: {
        type: String
    }
});

const userModel = mongoose.model("User", userSchema); // Capital "User"
module.exports = userModel;
