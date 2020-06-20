const express = require('express');
var app = express();
var router = express.Router();
const path = require('path');
const exphb = require('express-handlebars');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');


const session = require('express-session');
var flightcontroller= require('./flightcontroller');

var adminview= require('./adminviewbookingscontroller');
//var flightcontroller= require('./flightcontroller');
flights= require('./modules/flight.model');
bookflight=require('./modules/book.model');
reservedflight=require('./modules/reserved.model');
admininfo=require('./modules/admin.model');
const flight=mongoose.model('Flightschema');
const reserve=mongoose.model('Reservedschema');

const bookf= mongoose.model('bookschema');
app.get('/allbookings',(req,res,html)=>{
    
  printbooked(req,res);
  })
  function printbooked(req,res)
  {
      var c1= bookf.find({ },(err, result)=>{
              if(!err & result!='')
              {
                  res.render('aprintbooked',{data:result});
              }
              else if (!err)
  
              {console.log('No bookings '+req)
              res.render('anobookingsoption')
          }
              else
              {
                  console.log('Error during finding bookings '+err)
              }
      });
  } 
  
  
  

module.exports = app;