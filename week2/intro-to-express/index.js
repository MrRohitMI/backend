const express = require("express")
const app = express()
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))
let data;
app.get('/',(req,res)=>{
    res.render('index.ejs')
})
app.get('/form',(req,res)=>{
    res.render('form.ejs')
})
app.get('/details',(req,res)=>{
    if (!data) {
        return res.redirect("/form");
    }
    res.render('details.ejs',{data:data})
})
app.post('/submit',(req,res)=>{
    data = req.body
    res.redirect('/details')

})
app.listen('8000',()=>{
    console.log('Server is running on Port - 8000')
})