const express = require ('express');
const {adminAuthorized, userAuthorized} = require ('./middleware/auth.js')
const app = express();

app.use("/admin", adminAuthorized)

app.use('/admin',(req, res, next)=>{
    // res.send("Authorized Admin")
    next()
})


app.use('/admin/name/:id' ,adminAuthorized,(req, res)=>{
    res.send(`Authorized Admin ${req.params.id}`)
})
app.use('/user', userAuthorized,(req, res, next)=>{
    // res.send('user Authorized connected')
    next()
})

app.use('/user/password/:id' ,userAuthorized,(req, res)=>{
    res.send(`Authorized User ${req.params.id}`)
})

app.listen(7777,()=>{
    console.log("Server is Connected in 7777...");
    
})