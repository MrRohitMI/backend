const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    imgUrl:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    createdBy: {type: mongoose.Schema.Types.ObjectId,ref: "users"}
},{timestamps:true})

module.exports = mongoose.model('products',productSchema)