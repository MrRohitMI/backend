const express = require("express");
const app = express()
const cookieParser = require("cookie-parser")
const connectDB = require("./config/db")
const todoRouter = require("./routes/todos")
const userRouter = require("./routes/users")
const staticRouter = require("./routes/static");
const checkAuth = require("./middleware/checkAuth");
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
connectDB()

app.use("/todos",checkAuth, todoRouter)
app.use("/user",userRouter)
app.use("/",staticRouter)
app.listen(8000,()=>{
    console.log("Port is running port 8000")
})