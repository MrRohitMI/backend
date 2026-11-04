const User = require("../model/User")
const { setUser } = require("../services/auth")

async function register(req,res){
    await User.create(req.body)
    return res.redirect("/login")
}
async function login(req,res){
   const user = await User.findOne(req.body)
   if(!user) {
    res.render("login",{err: "User is invalid!"})
   } else {
    const token = setUser(user)
    res.cookie('uid',token)
    return res.redirect("/expense")
   }
}
module.exports = {register,login}