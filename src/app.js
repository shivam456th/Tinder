const express = require ("express");

const app = express();

const {adminAuth, userAuth} = require("./middlewares/auth.js")
// Handle Auth Middleware for all GET, POST,... requests

app.use("/admin",adminAuth )
app.use("/user",adminAuth )

app.get("/user/login", (req, res)=> {
    res.send("User logged in Successfully!!");
});

app.get("/user",userAuth, (req, res)=> {
    res.send("User Data Sent");
});

app.get("/admin/getAllData", (req, res)=> {
    res.send("All Data Sent");
});



app.get("/admin/deleteUser", (req, res) => {
    res.send("All Data deleteUser Sent");
})

app.listen(7777, ()=>{
    console.log("Server is successfully listion on port 7777...");  
})