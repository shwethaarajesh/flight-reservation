//CREATING THE SCHEMA FOR FLIGHTS
const mongoose = require('mongoose');
var res = new mongoose.Schema({
    flightid: {
    type: String,
    required: 'This field is required!'
    },
    seats: {
    type: Number
    },
    datetravel:{
    type: Date
    }
    });
     
    mongoose.model('reservedschema', res);