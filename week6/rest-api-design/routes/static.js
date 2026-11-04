const express = require("express");
const router = express.Router()
const Expense = require("../model/Expense");
const checkAuth = require("../middleware/checkAuth");

router.get("/create-expense",checkAuth,(req,res)=>{
    res.render("create-expense")
})
router.post("/edit-expense",checkAuth,async(req,res)=>{
    const expense = await Expense.findById(req.body.expenseId)
    res.render("edit-expense",{expense})
})
router.get("/",async(req,res)=>{
    res.render("register")
})
router.get("/login",async(req,res)=>{
    res.render("login")
})
module.exports = router