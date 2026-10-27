const mongoose = require("mongoose")
require("dotenv").config()
const MONGO_URI = process.env.MONGO_URI

async function connectDB(){
   await mongoose.connect(MONGO_URI)
   console.log("db is connected")
}

module.exports = connectDB