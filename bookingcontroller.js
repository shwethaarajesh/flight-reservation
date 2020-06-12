const express = require('express');
var app = express();
var router = express.Router();
const path = require('path');
const exphb = require('express-handlebars');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

var bookcontroller= require('./bookingcontroller');
flights= require('./modules/flight.model');
bookflight=require('./modules/book.model');
reservedflight=require('./modules/reserved.model');
userinfo=require('./modules/user.model');

const flight=mongoose.model('Flightschema');
const reserve=mongoose.model('reservedschema');

app.get('/bookflight',(req,res,html)=>{
    res.sendFile(__dirname + '/bookflight.html')
  })

app.post('/book', (req, res) => {
      console.log(req.body);
      res.sendFile(__dirname + '/listofflights.html')
    })


/*
function reservebook(req,res)
{
    
  var c1= reserve.find({ flightid: req.body.fid },(err, result)=>{
    if(!err & result!=''){
      
        console.log('Already present');
 
    }
    else if(!err)
    {
      insertReserve(req,res);
    }
    else {
        console.log('Error in retrieving employee list '+err+result);
        console.log(result);
        res.redirect('/');
    }
});
function insertReserve(req,res)
{
  var nr= new reserve();
  nr.flightid=req.body.fid;
  nr.seats= req.body.seats;
  nr.rows=req.body.rows;
  nr.from= req.body.from;
  nr.to=req.body.to;
  nr.save((err,doc)=> {
      if(!err)
          console.log('hi');
          //res.redirect('/bookflight');
      else
          console.log('Error during record insertion '+err);
  }
  );
}
}*/
module.exports=app;