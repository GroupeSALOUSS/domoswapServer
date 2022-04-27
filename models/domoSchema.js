const mongoose = require('mongoose');
var integerValidator = require('mongoose-integer');
const geocoder = require('../utils/geocoder.js');

//user schcema or Document structure
const  domoSchema =  new mongoose.Schema({

    title : {
        type : String,
        //required : true,
         unique : true
        },

        address: {
            type: String,
            //required: [true, 'Please add an address']
          },
          location: {
            type: {
              type: String,
              enum: ['Point']
            },
            coordinates: {
              type: [Number],
              index: '2dsphere'
            },
            formattedAddress: String
          },

        arrivalDate : {type : Date,
                required : false,
                
                },

         departureDate : {type : Date,
             required : false,
             
                    },

        homeType : {
        type : String,
        enum: ["House", "Apartment"]
        
  
       },

    residenceType : {
        type : String,
        enum: ["Primary", "Secondary"]
  
    },


    bedrooms : {
        type : Number ,
        integer : true
        },

    bathrooms : {
            type : Number ,
            integer : true
            },

    beds : {
     type : Number ,
     integer : true
            },
  
      imageUrl :{
       Type : String
       } ,
      
       tv : {
            type : Boolean ,
            },
       wifi : {
                type : Boolean ,
                }, 
      washingMachine : {
             type : Boolean ,
                    },
       dryer : {
             type : Boolean ,
                 },
       fridge : {
            type : Boolean ,
                    },
       phone : {
            type : Boolean ,
                  },   
        jacuzzi : {
            type : Boolean ,
                 },  
        pool : {
            type : Boolean ,
                  },         
              
      user : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "Users",
     // required : true
      }
      

})


// Geocode & create location
domoSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    console.log(loc);
    this.location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress
    };
  
    // Do not save address
    this.address = undefined;
    next();
  });

  domoSchema.plugin(integerValidator);
  

module.exports = new mongoose.model("DOMO",domoSchema);
