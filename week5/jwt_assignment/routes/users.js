const express = require("express")
const { createUser,loginUser,logout } = require("../controller/users")
const router = express.Router()

router.post("/",createUser)
router.post("/login",loginUser)
router.get("/logout",logout)

module.exports = router