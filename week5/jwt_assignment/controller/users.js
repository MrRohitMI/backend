const Users = require("../model/User")
const {setUser} = require("../services/auth")
async function createUser(req,res){
    await Users.create(req.body)
    res.redirect("/login")
}
async function loginUser(req,res){
    const user = await Users.findOne(req.body)
    if(!user) {
        res.render("login",{err:"User is invalid"})
    } else {
        const token = setUser(user)
        res.cookie('uid',token)
        res.redirect("/product")
    }
}
function logout(req,res){
    res.clearCookie('uid');
    res.redirect("/login");
}
module.exports = {createUser,loginUser,logout}