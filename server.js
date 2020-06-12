// FIRST GO TO MONGODB.JS TO ESTABLISH CONNECTION WITH MONGO
require('./modules/mongodb');
//COMES BACK
const express = require('express');
var app = express();
var router = express.Router();
const path = require('path');
const exphb = require('express-handlebars');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');


flights= require('./modules/flight.model');
bookflight=require('./modules/book.model');
reservedflight=require('./modules/reserved.model');
userinfo=require('./modules/user.model');
const log = mongoose.model('Userschema');
const flight=mongoose.model('Flightschema');
const reserve=mongoose.model('reservedschema');
app.use(bodyparser.urlencoded({
    extended: true
    }));
app.use(bodyparser.json({})); // parse application/json
//THIS REDIRECTS IT TO OUR HOME PAGE WHICH IS INDEX.HTML
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})
//IN POST WE USE /TRIAL SINCE THAT'S THE FORM ACTION IN IN INDEX
app.post('/login', (req, res) => {
    //WE ARE REDIRECTING TO A NEW PAGE /WORKPLEASE
    var cursor= log.find({ mob: req.body.mob, password : req.body.password },(err, result)=>{
        if(!err & result!=''){
            console.log(req.body)
            res.redirect('/options');
        }
        else {
            console.log('Error in retrieving employee list '+err+result);
            console.log(result);
            res.redirect('/');
        }
    });
});
app.get('/signup', function (req, res,html) {
  res.sendFile(path.join(__dirname+'/signup.html'));
 });
//THIS IS IF THEY SIGNED UP
  app.post('/signup', (req, res) => {
    //WE ARE REDIRECTING TO A NEW PAGE /WORKPLEASE
    insertRecord(req,res);
    //console.log('Yes');
  })
function insertRecord(req,res){
    var sign = new log();
    sign.name=req.body.name;
    sign.mob=req.body.mob;
    sign.age= req.body.age;
    sign.gender=req.body.gender;
    sign.email= req.body.email;
    sign.password=req.body.password;
    sign.save((err,doc)=> {
        if(!err)
            res.redirect('/options');
        else
            console.log('Error during record insertion '+err);
    });
}
console.log('Hi');
//THIS GETS THE NEW WORKPLEASE PAGE AND IS REDIRECTED TO WORK.HTML
app.get('/options',(req,res)=>{
  res.sendFile(__dirname + '/options.html')
})
app.get('/bookflight',(req,res,html)=>{
  res.sendFile(__dirname + '/bookflight.html')
})
//THIS GETS IT BACK FROM WORK AND PRINTS
app.post('/book', (req, res) => {
    console.log(req.body)
    res.redirect('/addflight');
  })
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
          //res.redirect('/bookflight');
      else
          console.log('Error during record insertion '+err);
  }
  );
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
}
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
app.listen(3000, function() {
    console.log('listening on 3000')
  })
 
module.exports = {app};
