const express = require('express');
var app = express();
var router = express.Router();
const path = require('path');
const exphb = require('express-handlebars');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

var aflightcontroller= require('./admincontroller');
const session = require('express-session');
var flightcontroller= require('./flightcontroller');
flights= require('./modules/flight.model');
bookflight=require('./modules/book.model');
reservedflight=require('./modules/reserved.model');
admininfo=require('./modules/admin.model');
const admin = mongoose.model('Adminschema');

app.get('/adminlogin',(req,res)=>{

    res.render('loginoptions');
  
  })

  app.post('/alogin', (req, res) => {
    sess=req.session;
    var cursor= admin.find({ mob: req.body.mob, password : req.body.password },(err, result)=>{
    if(!err & result!=''){
        //console.log(req.body)
        sess.mob=req.body.mob;
        //console.log(sess.mob);
        res.redirect('/adminoptions');
    }
    else if(err)
    {
      console.log('Error during login '+err);
    }
    else {
        console.log('No such user to login');
        //console.log(result);
        res.redirect('/adminlogin');
    }
    });
}); 

app.get('/adminsignup', function (req, res,html) {
    res.render('adminsignup');
   });
  
  app.post('/asignup', (req, res) => {
      insertRecord(req,res);
    })
  function insertRecord(req,res){
      var sign = new admin();
      sign.name=req.body.name;
      sign.mob=req.body.mob;
      sign.age= req.body.age;
      sign.gender=req.body.gender;
      sign.email= req.body.email;
      sign.password=req.body.password;
      sign.save((err,doc)=> {
          if(!err)
              res.redirect('/adminoptions');
          else
              console.log('Error during record insertion for signup'+err);
      });
  }
console.log('hello');
 app.use('/',aflightcontroller);
 module.exports = app;