const jwt = require("jsonwebtoken")
require("dotenv").config()
const secret = process.env.jwtSecret
function setUser(user){
    return jwt.sign({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    },secret,{
        expiresIn: '1m'
    })
}
function getUser(token){
    if(!token) return null
    try{
        return jwt.verify(token,secret)
    } catch(err) {
        return null
    } 
}

module.exports ={setUser,getUser}