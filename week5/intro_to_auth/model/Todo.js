const mongoose = require("mongoose")
const todoSchema = mongoose.Schema({
    title: {type:String,required:true},
    isCompleted: {type:Boolean,default:false},
    createdBy: {type: mongoose.Schema.Types.ObjectId,ref: "users"}
},{timestamps:true})
module.exports = mongoose.model("todos",todoSchema)