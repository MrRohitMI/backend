const express = require('express')
const app = express()
const userList = [];
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.render('index',{users: userList,count : userList.length})
})
app.get('/add-user',(req,res)=>{
    res.render('add-user')
})

app.post('/add-user',(req,res)=>{
    userList.push(req.body)
    res.redirect('/')
})
app.post('/delete',(req,res)=>{
    let {userId} = req.body;
    userList.splice(userId,1)
    res.redirect('/')
})
app.post('/edit',(req,res)=>{
    let {userId} = req.body;
    let user = userList[userId];
    res.render('edit-user',{user,userId})
})
app.post('/edit-user',(req,res)=>{
    let {userId} = req.body;
    userList.splice(userId,1,req.body)
    res.redirect('/')
})
app.listen('8000',()=>{
    console.log("Server is running on port 8000")
})