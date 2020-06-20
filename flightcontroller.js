const express = require('express');
var app = express();
var router = express.Router();
const path = require('path');
const exphb = require('express-handlebars');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
var reschedulecontroller=require('./reschedulecontroller');
var cancelcontroller=require('./cancelcontroller');
var bookingcontroller= require('./bookingcontroller');
var displaycontroller= require('./displaybookedcontroller');
var userdisplaycontroller= require('./userdetailscontroller');
flights= require('./modules/flight.model');
bookflight=require('./modules/book.model');
reservedflight=require('./modules/reserved.model');
userinfo=require('./modules/user.model');

const flight=mongoose.model('Flightschema');
const reserve=mongoose.model('Reservedschema');

app.use('/',bookingcontroller);
app.use('/',displaycontroller);
app.use('/',userdisplaycontroller);
app.use('/',cancelcontroller);
app.use('/',reschedulecontroller);
app.get('/options',(req,res,html)=>{
  res.render('options');
})
  module.exports = app;