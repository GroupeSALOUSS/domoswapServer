
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/userSchema');



module.exports.signUp = async (req,res)=>{
    try{
       //Get body or data
      const username = req.body.username
      const phone = req.body.phone;
      const email = req.body.email;
      const password = req.body.password;
   
      const createUser = new Users({
        username : username,
         email : email,
         phone :  phone,
         password : password
 
      });
 
      const created = await createUser.save();
      console.log (created);
      res.status(200).send("Registered");
    }catch(error){
        res.status(400).send(error)
      
    }
 }


 module.exports.logIn = async (req,res)=>{
  try{
     const email = req.body.email;
     const password = req.body.password;
     
     //Find user if exist
    const user = await Users.findOne({email : email});
     if (user){
        //Verify password

        const isMatch = await bcryptjs.compare(password,user.password);

        if (isMatch){
           //generate token 

           const token = await user.generateToken();
           res.cookie("jwt",token,{
              //expires token in 24 h
              expires : new Date (Date.now()+86400000),
              httpOnly : true
           })
           res.status(200).send("loggedIn")
        }else{
           res.status(400).send("Invalid informaton");
        }
     }else{
        res.status(400).send("Invalid informaton");
     }


  }catch(error){
     res.status(400).send(error)
   
 }

  }

  module.exports.logOut = async (req,res)=>{
   res.cookie('jwt','',{maxAge : 1});
   res.redirect('/');
  } 