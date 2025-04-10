const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log( req.body)
  
  
  //create a new instance of the User model
//   const user = {
//     firstName: "Akash",
//     lastName: "Thapa",
//     emailId: "Akashthapa123@gmail.com",
//     password: "989765778665",
//   };
// try {
//   // const user = new User(userObje);
// await user.save();
// res.send("User Added successfully!");
// } catch (error) {
//   res.status(404).send("Error saving the user:" + error.message)
// }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is Successfully listening on port 7777");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected...");
  });
