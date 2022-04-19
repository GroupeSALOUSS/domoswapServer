//import all Dependencies
const mongoose = require('mongoose');
const dotenv  = require('dotenv');
const express = require('express');
const jwt = require('jsonwebtoken');

//Routes
const  userRoute = require("./routes/user");
//const  domoRoute = require("./routes/domo");


const port = process.env.PORT;
const app = express();


//Configure ENV file 
dotenv.config({path:'./config.env'});
require('./db/conn');


const { is } = require('express/lib/request');

//These Method is Used to get data and cookies from frontend
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.get('/',(req,res)=>{
 res.send("Hello world");
})


app.use('/users',userRoute);
//app.use('/demos',domoRoute);
const Domos = require('./models/domoSchema');

//set up multer for storing uploaded files
const multer = require('multer');
const Users = require('./models/userSchema');
const path = require('path');
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
       cb(null, './uploads');
   },
  
   filename: function (req, file, cb) {
       cb(null,date + '-' + file.originalname);
   }
});
   const fileFilter =  (req, file, cb) => {
      if (file.mimetype === 'image/png',file.mimetype === 'image/jpg',file.mimetype === 'image/jpeg'){ 
         cb(null,true);
      }else{
         cb(new Error() ,false);
      }   
  };


const upload = multer({ storage: storage,fileFilter: fileFilter }).single('newimages');

app.post('/d',upload,async (req,res)=>{

    const  title = req.body.title;
    const bedrooms = req.body.bedrooms;
    const bathrooms =req.body.bathrooms;  
    const  beds = req.body.beds;
    const homeType = req.body.homeType;
    const residenceType = req.body.residenceType;
    const arrivalDate = req.body.arrivalDate;
    const  departureDate = req.body. departureDate;
    

    const token = req.header('x-auth-token')
   if (!token) return res.status(401).send("unauthoriezed")
   
   try{

      const user = jwt.verify(token,'ibrahimchakernmjdkuegxbgdjshgjd')
      
     // console.log(req.file.path);
      const domo = new Domos({
         title : title,
         bedrooms : bedrooms ,
         bathrooms :  bathrooms ,
         beds : beds,
         homeType : homeType ,
         residenceType : residenceType,
         arrivalDate : arrivalDate,
         departureDate  : departureDate,
         images :{
            data: req.file.filename,
            contentType: 'image/png'
         },
         user : user._id,
         
      })

      const domoCre = await domo.save();
      console.log (domoCre);
      res.status(200).send(" Domo Registered");

   }catch(error){
      res.status(400).send(error)
    
  }
})



//run server
app.listen(3001,()=>{
   console.log("Server is Listening");
})


