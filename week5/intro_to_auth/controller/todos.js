const Todos = require("../model/Todo")
async function getTodos(req,res){
     let todos = await Todos.find({isCompleted:false,createdBy:req.user._id})
    res.render("index",{todos})
}
async function submitTodo(req,res){
    await Todos.create({title:req.body.title,createdBy:req.user._id})
    res.redirect("/todos")
}
async function markCompleted(req,res){
    let id = req.params.id
    await Todos.findByIdAndUpdate(id,{
        isCompleted: true
    })
    res.redirect("/todos")
}
async function getCompletedTodos(req,res){
    let todos = await Todos.find({isCompleted:true})
    res.render("completed",{todos})
}
async function deleteTodo(req,res){
    let id = req.params.id
    await Todos.findByIdAndDelete(id,{
        isCompleted: true
    })
    res.redirect("/todos")
}
module.exports = {getTodos,submitTodo,markCompleted,getCompletedTodos,deleteTodo}