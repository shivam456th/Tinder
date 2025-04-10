const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://onetest585:8iQjZt5PbC5GYY9Z@cluster0.cet7igb.mongodb.net/jobportalDB"
  );
};

module.exports = connectDB;
