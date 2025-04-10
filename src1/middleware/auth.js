const adminAuthorized = (req, res, next)=>{
    console.log("admin connected");
    const token = "xyz"
    const authorized = token === "xyz"
    if (!authorized) {
        res.send(401).send("UnAuthorized Admin")
    } else {
        next()
    }
}

const userAuthorized = (req, res, next)=>{
    console.log("User connected");
    const token = "xyz"
    const authorized = token === "xyz"
    if (!authorized) {
        res.send(401).send("UnAuthorized USER")
    } else {
        next()
    }
}

module.exports = {adminAuthorized, userAuthorized}