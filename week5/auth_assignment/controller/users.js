const Users = require("../model/User")
const {setUser} = require("../services/auth")
const {v4:uuidv4} = require("uuid")
async function createUser(req,res){
    await Users.create(req.body)
    res.redirect("/login")
}
async function loginUser(req,res){
    const user = await Users.findOne(req.body)
    if(!user) {
        res.render("login",{err:"User is invalid"})
    } else {
        const sessionId = uuidv4()
        setUser(sessionId,user)
        res.cookie('uid',sessionId)
        res.redirect("/product")
    }
}

module.exports = {createUser,loginUser}