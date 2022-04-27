const mongoose = require('mongoose');
//const bcryptjs = require('bcryptjs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isEmail } = require('validator');
var integerValidator = require('mongoose-integer');

//user schcema or Document structure
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: false,
        unique: true
    },


    email: {
        type: String,
        required: true,
        validate: [isEmail],
        unique: true,

    },
    password: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/
    },


    tokens: [

        {
            token: {
                type: String,
                required: true
            }
        }
    ]


})


//hashing password to secure
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = bcryptjs.hashSync(this.password, 10)
    }
    next()
})

//Generate Token to Verify User
userSchema.methods.generateToken = async function () {
    try {

        let generatedToken = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: generatedToken });
        await this.save();
        return generatedToken;

    } catch (error) {
        console.log(error)

    }

}

userSchema.plugin(integerValidator);

// Create Model
const Users = new mongoose.model("USER", userSchema);

module.exports = Users;

