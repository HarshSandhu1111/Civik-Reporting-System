const generatetoken = require('../config/generatetoken');
const User = require('../models/user');
const Report = require('../models/report');
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
    
     res.status(200).json(
      {  name,
        email,
         password,
        role,
        departmentId,
        phone,
        address,
        token : generatetoken(user._id,role)
      }
   
    );
       return;
    
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
       res.status(200).json({
        id:user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        departmentId: user.departmentId,
        phone: user.phone,
        address: user.address,
        token: generatetoken(user._id, user.role)
               });

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

const generateReport = async (req,res) => {
        const {title,description,location,image,departmentId} = req.body;
        let citizenId = req.user.id;
        
        if(!title || !description || !location || !citizenId){
            return res.status(400).json("Provided detail is not enough");
        }
        try{
        const report =await  Report.create({
            title,
            description,
            location,
            image,
            departmentId,
            citizenId
        });
        if(report){
            return res.status(200).json({report});
        }
   
    }
    catch(error){
        res.status(400).json(error);
    }
        
};


const getreports = async (req,res) => {
    const id = req.user.id;
    try {
        const allreports = await Report.find({citizenId: id });
        if(!allreports){
            res.status(200).json("NO REPORT FOUND");
        return;
        }
        return res.status(200).json(allreports);


    } catch (error) {
        res.json(error);
    }
}
const deleteReport = async (req, res) => {
  const reportId = req.params.id;   
  const userId = req.user.id;       

  try {
    const report = await Report.findById(reportId);

    if (!report) {
         return res.status(404).json({ message: "Report not found" });
    }
    if (report.citizenId.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to delete this report" });
    }

        await Report.findByIdAndDelete(reportId);

        res.status(200).json({ message: "Report deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {signup,login,generateReport,getreports,deleteReport};