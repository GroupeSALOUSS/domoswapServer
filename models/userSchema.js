const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
var integerValidator = require('mongoose-integer');

//user schcema or Document structure
const  userSchema =  new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        unique : true
        },

        lastName : {
            type : String,
            required : true,
            unique : true
            },

        email : {
        type : String,
        required : true,
        unique : true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        password : {
        type : String,
        required : true 
        },

        phone  : {
            type: String,
            match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/
            },


    tokens : [
    
        {
            token : {
              type : String,
             required : true
             }
        }
        ]
    
    
    })
 

    //hashing password to secure
userSchema.pre('save',async function(next){
    if (this.isModified('password')){
    this.password = bcryptjs.hashSync(this.password,10)
        }
    next() 
    })

 //Generate Token to Verify User
 userSchema.methods.generateToken = async function(){
    try{

        let generatedToken = jwt.sign({_id : this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token : generatedToken});
        await this.save();
        return generatedToken;

     }catch(error){
         console.log(error)
       
     }

 }

 userSchema.plugin(integerValidator);
 
 // Create Model
 const Users = new mongoose.model("USER",userSchema);

module.exports = Users;

//export default mongoose.model("Users",userSchema);