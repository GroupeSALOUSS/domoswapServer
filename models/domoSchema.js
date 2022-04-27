const mongoose = require('mongoose');
var integerValidator = require('mongoose-integer');

//user schcema or Document structure
const domoSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },

    addresse: {

        street: String,
        city: String,
        state: String,
        zip: String

    },

    arrivalDate: {
        type: Date,
        required: false,

    },

    departureDate: {
        type: Date,
        required: false,

    },

    homeType: {
        type: String,
        enum: ["House", "Apartment"]


    },

    residenceType: {
        type: String,
        enum: ["Primary", "Secondary"]

    },


    bedrooms: {
        type: Number,
        intger: true
    },

    bathrooms: {
        type: Number,
        intger: true
    },

    beds: {
        type: Number,
        intger: true
    },

    images: {
        data: Buffer,
        contentType: String
        //Type : String
    },



    tv: {
        type: Boolean,
    },
    wifi: {
        type: Boolean,
    },
    washingMachine: {
        type: Boolean,
    },
    dryer: {
        type: Boolean,
    },
    fridge: {
        type: Boolean,
    },
    phone: {
        type: Boolean,
    },
    jacuzzi: {
        type: Boolean,
    },
    pool: {
        type: Boolean,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required : true
    }


})

domoSchema.plugin(integerValidator);

const Domos = new mongoose.model("DOMO", domoSchema);
module.exports = Domos;
