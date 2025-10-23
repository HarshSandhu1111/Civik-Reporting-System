const express = require("express");

const app = express();

let port=5000;
app.get('/',(req,res)=>{
  res.send("hello");  
})
app.listen(port,()=>{
    console.log('server live on port ',port );
    
})