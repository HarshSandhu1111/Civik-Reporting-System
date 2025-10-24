const jwt = require("jsonwebtoken");
require('dotenv').config();

const secret= process.env.JWT_SECRET ;
const generatetoken = (id,role)=>{
    return jwt.sign({id,role},secret,{expiresIn:"30d"});

}

module.exports = generatetoken;