const express = require("express");
const checkAuth = require("../middleware/checkAuth");
const router = express.Router()

router.get("/create-product",checkAuth,(req,res)=>{
    res.render("createProduct")
})
router.get("/",(req,res)=>{
    res.render("register")
})

router.get("/login",(req,res)=>{
    res.render("login")
})
module.exports = router