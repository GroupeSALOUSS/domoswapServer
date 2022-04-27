const mongoose = require('mongoose');
//const bcryptjs = require('bcryptjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isEmail }  = require ('validator');
var integerValidator = require('mongoose-integer');

//user schcema or Document structure
const  userSchema =  new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique : true
        },

    
        email : {
        type : String,
        required : true,
        validate: [ isEmail],
        unique : true,
         
        },
        password : {
        type : String,
        required : true 
        },

        phone  : {
            type: String,
            match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/
            },


    })
 

 

// play function before save into display: 'block',
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });



userSchema.statics.login = async function(email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email')
};

 userSchema.plugin(integerValidator);
 
 // Create Model
 const Users = new mongoose.model("USER",userSchema);

module.exports = Users;

