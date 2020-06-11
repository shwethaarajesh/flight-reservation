//CREATING THE SCHEMA FOR FLIGHTS
const mongoose = require('mongoose');
var flightschema = new mongoose.Schema({
    name: {
    type: String,
    required: 'This field is required!'
    },
    flightid: {
    type: String,
    required: 'This field is required!'
    },
    seats: {
    type: Number
    },
    rows:{
    type: Number
    },
    from: {
    type: String
    },
    to:{
    type: String
    }
    });
     
    mongoose.model('Flightschema', flightschema);