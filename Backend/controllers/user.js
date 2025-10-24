const User = require('../models/user');

const signup = async(req,res)=>{
    const {name,email,password,role,departmentId,phone,address} = req.body;
        if(!name || !email || !password || !address  || !phone){
            res.status(400).json('Please eneter required fields');
            return ;
        }
        try{
    const alreadyexist = await User.findOne({email});
    if(alreadyexist){
        res.json("user already exist");
    return;
    }
    const user = await User.create({
        name,
        email,
        password,
        role,
        departmentId,
        phone,
        address
    });
    
    res.status(200).json(user);
    
    
        }
        catch(error){
            console.log(error);
        }
};

const login = async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json("Please enter all fields");
    }
    try{

    const user = await User.findOne({email});
    if(user){
        if(password == user.password){
            return res.status(200).json(user);
        }
        else{
            return res.status(400).json("Invalid Password");
        }
    }
    else{
        return res.json("NO such user exists");
    }
}
catch(error){
    res.json(error);
}
};

module.exports = {signup,login};