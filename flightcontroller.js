const express = require('express');
var app = express();
var router = express.Router();
const path = require('path');
const exphb = require('express-handlebars');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

var bookingcontroller= require('./bookingcontroller');
flights= require('./modules/flight.model');
bookflight=require('./modules/book.model');
reservedflight=require('./modules/reserved.model');
userinfo=require('./modules/user.model');

const flight=mongoose.model('Flightschema');
const reserve=mongoose.model('reservedschema');

app.use('/',bookingcontroller);
app.get('/options',(req,res)=>{
  res.sendFile(__dirname + '/options.html')
})/*
app.get('/bookflight',(req,res,html)=>{
  res.sendFile(__dirname + '/bookflight.html')
})
//THIS GETS IT BACK FROM WORK AND PRINTS
app.post('/book', (req, res) => {
    console.log(req.body)
   // res.redirect('/addflight');
  })
  */
  app.get('/addflight',(req,res,html)=>{
    res.sendFile(__dirname + '/insert-flight.html')
})
app.post('/newflight', (req, res) => {
  console.log(req.body)
  insertFlight(req,res);
})
function insertFlight(req,res){
  var nf = new flight();

  nf.name=req.body.name;
  nf.flightid=req.body.fid;
  nf.seats= req.body.seats;
  nf.rows=req.body.rows;
  nf.from= req.body.from;
  nf.to=req.body.to;
  nf.save((err,doc)=> {
      if(!err)
          res.send('Successful')
      else
          console.log('Error during record insertion '+err);
  }
  );
  /*
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
});*/
}

/*
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
*/
  module.exports = app;