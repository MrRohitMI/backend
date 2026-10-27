const express = require("express");
const app = express();
const cookieParser = require("cookie-parser")
const connectDB = require("./config/db")
const staticRouter = require("./routes/static")
const userRouter = require("./routes/users")
const productRouter = require("./routes/products")
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
connectDB()

app.use("/",staticRouter)
app.use("/product",productRouter)
app.use("/user",userRouter)
app.listen(8000,()=>{
    console.log("server is running on port 8000")
})