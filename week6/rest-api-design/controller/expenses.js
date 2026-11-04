const Expense = require("../model/Expense")
async function createExpense(req,res){
    await Expense.create({...req.body,createdBy:req.user.id})
    return res.redirect("/expense")
}
async function getExpenses(req,res){
    const expenses = await Expense.find({createdBy:req.user.id}).select("title amount category date");
    res.render("expenses-list",{expenses,count:expenses.length})
}
async function editExpense(req,res){
    await Expense.findByIdAndUpdate(req.body.expenseId,{id:req.body.expenseId,...req.body})
    return res.redirect("/expense")
}

async function deleteExpense(req,res){
    await Expense.findByIdAndDelete(req.body.expenseId)
    return res.redirect("/expense")
}
module.exports = {createExpense,getExpenses,editExpense,deleteExpense}