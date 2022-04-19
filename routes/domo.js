/*const express = require('express');
const router = express.Router()
const fs = require('fs');
const GridFsStorage = require('multer-gridfs-storage');

const Domos = require('../models/domoSchema');

//set up multer for storing uploaded files
const multer = require('multer');
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

const upload = multer({ storage: storage });

router.post('/d',async (req,res)=>{

  const  title = req.body.title;

 


 const token = req.header('x-auth-token')
 if (!token) return res.status(401).send("unauthoriezed")
 
 try{

    /*const user = jwt.verify(token,'ibrahimchakernmjdkuegxbgdjshgjd')
    console.log(req.file.path);

    const domo = new Domos({
       title : title,
       
       
    });

    const domoCre = await domo.save();
    console.log (domoCre);
    res.status(200).send(" Domo Registered");

 }catch(error){
    res.status(400).send(error)
  
}
})

module.exports = router;*/