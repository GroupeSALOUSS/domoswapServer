const mongoose = require('mongoose');

const positionSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });
  
const Positions = new mongoose.model("POSITION",positionSchema );


module.exports = Positions;