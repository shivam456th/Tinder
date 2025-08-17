const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')
const bcrypt = require ('bcrypt')
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 4,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    validate(value){
        if (!["male", "female", "other"].includes(value)) {
            throw new Error ("Gender data is not valid")
        }
    },
    lowercase: true,
  },
  age: { type: Number, min: 18, max: 65 },
  photoUrl: {
    type: String,
    default:
    "https://geographyandyou.com/images/user-profile.png",
  },
  
  about: {
    type: String,
    default: "This is default of the user!",
  },
  skills: {
    type: [String],
  },
},
{
  timestamps: true,
}
);

userSchema.methods.getJWT = async function() {
  const user = this;
  const token = await jwt.sign({_id: user._id}, "DEV@Tinder$790", {
    expiresIn: "7d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid =  await bcrypt.compare(passwordInputByUser, passwordHash);
  return isPasswordValid;
}

const userModel = mongoose.model("User", userSchema); // Capital "User"
module.exports = userModel;
