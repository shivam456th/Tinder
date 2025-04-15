const mongoose = require("mongoose");

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
      "https://www.shareicon.net/data/512x512/2017/06/21/887406_man_512x512.png",
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

const userModel = mongoose.model("User", userSchema); // Capital "User"
module.exports = userModel;
