//import all Dependencies
//const mongoose = require('mongoose');
const dotenv  = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//Configure ENV file 
dotenv.config({path:'./config.env'});
require('./db/conn');

const port = process.env.PORT;
const app = express();

//Routes
const  userRoute = require("./routes/user");
const  domoRoute = require("./routes/domo");


//These Method is Used to get data and cookies from frontend

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());

app.get('/',(req,res)=>{
   res.send("Hello world");
  })



app.use('/users',userRoute);
app.use('/domos',domoRoute);



//run server
app.listen(3001,()=>{
   console.log("Server is Listening");
})


