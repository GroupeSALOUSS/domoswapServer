//import all Dependencies
const cors = require('cors');
const dotenv  = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const {checkUser, requireAuth} = require('./middleware/auth');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//Configure ENV file 
dotenv.config({path:'./config.env'});
require('./db/conn');

const port = process.env.PORT;
const app = express();

//These Method is Used to get data and cookies from frontend

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});


//Routes
const  userRoute = require("./routes/user");
const  domoRoute = require("./routes/domo");




app.get('/',(req,res)=>{
   res.send("Hello world");
  })

app.use(cors());

app.use('/users',userRoute);
app.use('/domos',domoRoute);



//run server
app.listen(3001,()=>{
   console.log("Server is Listening");
})


