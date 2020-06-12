//CREATING THE SCHEMA FOR FLIGHTS
const mongoose = require('mongoose');
var booker = new mongoose.Schema({
    name: {
    type: String,
    required: 'This field is required!'
    },
    flightid: {
    type: String,
    required: 'This field is required!'
    },
    mobileno: {
    type: String,
    required: 'This field is required!'
    },
    nseats: {
    type: Number
    },
    from: {
    type: String
    },
    to:{
    type: String
    },
    datetravel:{
    type: Date
    }
    });
     
    mongoose.model('bookschema', booker);