const express = require("express");
const connectDB = require("./config/database.js");
const User = require("./models/user.js");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const userObje = new User(req.body)
try {
  const user = new User(userObje);
await user.save();
res.send("User Added successfully!");
} catch (error) {
  res.status(404).send("Error saving the user:" + error.message)
}
});

// Get user by email
app.get("/user", async (req, res)=>{
  const userEmail = req.body.emailId;

  try{
    const users = await User.find({ emailId: userEmail})
    if (users.length === 0) {
      res.status(404).send("User not found")
    } else {
      res.send(users);
    }
  } catch(error){
    res.status(400).send("Something went Wrong⚠")
  }
})

// Feed API - GET /feed - get all the users from the database
app.get('/feed', async(req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong-")
  }
})

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
