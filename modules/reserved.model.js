//CREATING THE SCHEMA FOR FLIGHTS
const mongoose = require('mongoose');
var res = new mongoose.Schema({
    flightid: {
    type: String
    },
    seats: {
    type: Number
    },
    datetravel:{
    type: Date
    }
    });
     
    mongoose.model('Reservedschema', res);