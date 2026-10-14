const express = require("express");
const app = express()
const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI = process.env.MONGO_URI;
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}))
mongoose.connect(mongoURI).then(()=>{
    console.log("DB is connected");
})
const todoSchema = mongoose.Schema({
    title: {type:String,required:true},
    isCompleted: {type:Boolean,default:false}
},{timestamps:true})
const Todos = mongoose.model("todos",todoSchema)
app.get("/",async(req,res)=>{
    let todos = await Todos.find({isCompleted:false})
    res.render("index",{todos})
})
app.post("/submit",async(req,res)=>{
    await Todos.create({title:req.body.title})
    res.redirect("/")
})
app.post("/todos/:id/complete", async(req,res)=>{
    let id = req.params.id
    await Todos.findByIdAndUpdate(id,{
        isCompleted: true
    })
    res.redirect("/")
})
app.get("/completed",async(req,res)=>{
    let todos = await Todos.find({isCompleted:true})
    res.render("completed",{todos})
})
app.post("/todos/:id/delete", async(req,res)=>{
    let id = req.params.id
    await Todos.findByIdAndDelete(id,{
        isCompleted: true
    })
    res.redirect("/")
})
app.listen(8000,()=>{
    console.log("Port is running port 8000")
})