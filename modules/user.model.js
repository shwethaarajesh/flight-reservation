//CREATING THE SCHEMA FOR ALL USERS 
const mongoose = require('mongoose');
var user = new mongoose.Schema({
    name: {
    type: String,
    required: 'This field is required!'
    },
    mob: {
    type: String,
    required: 'This field is required!'
    },
    age: {
    type: Number
    },
    gender:{
    type: String
    },
    email: {
    type: String
    },
    password:{
    type: String
    }
    });
     
    mongoose.model('Userschema', user);