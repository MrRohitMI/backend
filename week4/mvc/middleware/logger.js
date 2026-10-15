const fs = require("fs")
function logger(req,res,next){
    data = `requested method ${req.method} and url: ${req.originalUrl} by ${req.ip}\n`
    fs.appendFile("log.txt",data,(err)=>{
        if(err) console.log(err)    
        else console.log("Data appended successfully")
    })
    next()
}
module.exports = logger