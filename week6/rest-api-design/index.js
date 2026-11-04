const express = require("express");
const connectDB = require("./config/db");
const staticRouter = require("./routes/static")
const expenseRouter = require("./routes/expenses")
const userRouter = require("./routes/user");
const checkAuth = require("./middleware/checkAuth");
const app = express()
const cookieParser = require("cookie-parser")
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
connectDB()
app.use(cookieParser())
app.use("/",staticRouter)
app.use("/expense",checkAuth,expenseRouter)
app.use("/",userRouter)
app.listen(8000,()=>{
    console.log("server is running on port 8000")
})