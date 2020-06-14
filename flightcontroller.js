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
  app.get('/addflight',(req,res,html)=>{
    sess=req.session;
   console.log(sess.mob,'works');
   res.render('insert-flight')
})
app.post('/newflight', (req, res) => {
  console.log(req.body)
  insertFlight(req,res);
  res.redirect('/options');
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
          console.log(' Flight has been inserted successfully')
      else
          console.log('Error during flight insertion '+err);
  }
  );
}

  module.exports = app;