const express = require('express');
var app = express();
var router = express.Router();
const path = require('path');
const exphb = require('express-handlebars');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');


const session = require('express-session');
var flightcontroller= require('./flightcontroller');

var adminviewb= require('./adminviewbookingscontroller');
var adminviewu= require('./adminviewuserscontroller');
var adminviewf= require('./adminviewflightscontroller');
var checkseats= require('./checkseatscontroller');
//var flightcontroller= require('./flightcontroller');
flights= require('./modules/flight.model');
bookflight=require('./modules/book.model');
reservedflight=require('./modules/reserved.model');
admininfo=require('./modules/admin.model');
const flight=mongoose.model('Flightschema');
const reserve=mongoose.model('Reservedschema');

app.get('/adminoptions',(req,res,html)=>{
    res.render('adminoptions');
  })
app.use('/',adminviewb);
app.use('/',adminviewf);
app.use('/',adminviewu);
app.use('/',checkseats);
  app.get('/addflight',(req,res,html)=>{
    sess=req.session;
   console.log(sess.mob,'works');
   res.render('insert-flight')
})
app.post('/newflight', (req, res) => {
  console.log(req.body)
  insertFlight(req,res);
  res.redirect('/adminoptions');
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