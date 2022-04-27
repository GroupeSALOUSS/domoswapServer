const mongoose = require('mongoose');

const swapSchema = new mongoose.Schema({
  userDem : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Users",
   // required : true
    },

    userRec : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Users",
     // required : true
      },

      validation : {
        type:Boolean,
        },
    message :{
      type:String
    }


   
  });
  



const Swaps = new mongoose.model("SWAP",swapSchema );