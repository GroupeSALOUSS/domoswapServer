const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const router = express.Router()
const Users = require('../models/userSchema');
router.use(cookieParser());


//sign up

router.post('/signup', async (req,res)=>{
    try{
       //Get body or data
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const phone = req.body.phone;
      const email = req.body.email;
      const password = req.body.password;
   
      const createUser = new Users({
         firstName : firstName,
         lastName : lastName,
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
 })


 //login

router.post('/login', async (req,res)=>{
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
 
    })

module.exports = router;