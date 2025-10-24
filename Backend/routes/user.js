const express = require("express");
const Router = express.Router();
const {signup, login} = require('../controllers/user');

Router.get('/',(req,res)=>{
    res.send("Backend Running");
});
Router.post('/signup',signup);
Router.post('/login',login);

module.exports = Router;