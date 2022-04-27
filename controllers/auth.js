
//const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/userSchema');


const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};


<<<<<<< HEAD
module.exports.signUp = async (req, res) => {
   try {
      //Get body or data
=======
module.exports.signUp = async (req,res)=>{
    try{
       //Get body or data
>>>>>>> c5e20af3456dba29ec2a28719a8456bd70e96e95
      const userName = req.body.userName
      const phone = req.body.phone;
      const email = req.body.email;
      const password = req.body.password;

      const createUser = new Users({
<<<<<<< HEAD
         userName: userName,
         email: email,
         phone: phone,
         password: password

=======
        userName : userName,
         email : email,
         phone :  phone,
         password : password
 
>>>>>>> c5e20af3456dba29ec2a28719a8456bd70e96e95
      });

      const created = await createUser.save();
      console.log(created);
      res.status(200).send("Registered");
   } catch (error) {
      res.status(400).send(error)

   }
}


<<<<<<< HEAD
module.exports.logIn = async (req, res) => {
   try {
      const email = req.body.email;
      const password = req.body.password;
=======
 /*module.exports.logIn = async (req,res)=>{
  try{
     const email = req.body.email;
     const password = req.body.password;
     
     //Find user if exist
    const user = await Users.findOne({email : email});
     if (user){
        //Verify password
>>>>>>> c5e20af3456dba29ec2a28719a8456bd70e96e95

      console.log("is email: "+email)

      //Find user if exist
      const user = await Users.findOne({ email: email });
      if (user) {
         //Verify password

         const isMatch = await bcryptjs.compare(password, user.password);

         if (isMatch) {
            //generate token 

            const token = await user.generateToken();
            res.cookie("jwt", token, {
               //expires token in 24 h
               expires: new Date(Date.now() + 86400000),
               secure: true,
               httpOnly: true
            })
            console.log(token)
            res.status(200).send(user)

         } else {
            res.status(400).send("Invalid informaton");
         }
      } else {
         res.status(400).send("Invalid informaton");
      }


   } catch (error) {
      res.status(400).send(error)

<<<<<<< HEAD
   }
=======
  }*/


  module.exports.logIn =  async (req, res) => {
   const { email, password } = req.body
 
   try {
     const user = await Users.login(email, password);
     const token = createToken(user._id);
     res.cookie('jwt', token, { httpOnly: true, maxAge});
     res.status(200).send('logged in')
   } catch (err){
     const errors = signInErrors(err);
     res.status(200).json({ errors });
   }
 }



>>>>>>> c5e20af3456dba29ec2a28719a8456bd70e96e95

}

module.exports.logOut = async (req, res) => {
   res.cookie('jwt', '', { maxAge: 1 });
   res.redirect('/');
} 