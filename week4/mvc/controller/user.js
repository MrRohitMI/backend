const User = require("../model/User")

async function getUsers(req,res){
    let users = await User.find({})
    return res.json(users)
}
async function createUser(req,res){
    let user = req.body;
    await User.create(user);
    return res.send("User created successfully!")
}
async function updateUser(req,res){
    let id = req.params.id
    await User.findByIdAndUpdate(id,req.body)
    return res.send("User updated successfully!")
}
async function deleteUser(req,res){
    let id = req.params.id
     await User.findByIdAndDelete(id)
    return res.send("User deleted successfully!")
}
module.exports = {getUsers,createUser,updateUser,deleteUser}