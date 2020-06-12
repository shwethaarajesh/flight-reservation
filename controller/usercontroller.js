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
flights= require('./modules/flight.model');
bookflight=require('./modules/book.model');
reservedflight=require('./modules/reserved.model');
userinfo=require('./modules/user.model');
const log = mongoose.model('Userschema');

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})
//IN POST WE USE /TRIAL SINCE THAT'S THE FORM ACTION IN IN INDEX
app.post('/login', (req, res) => {
    //WE ARE REDIRECTING TO A NEW PAGE /WORKPLEASE
    var cursor= log.find({ mob: req.body.mob, password : req.body.password },(err, result)=>{
        if(!err & result!=''){
            console.log(req.body)
            res.redirect('/workplease');
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
            res.redirect('/workplease');
        else
            console.log('Error during record insertion '+err);
    });
}
console.log('Hi');
//THIS GETS THE NEW WORKPLEASE PAGE AND IS REDIRECTED TO WORK.HTML
  app.get('/workplease',(req,res)=>{
    res.sendFile(__dirname + '/work.html')
})
//THIS GETS IT BACK FROM WORK AND PRINTS
app.post('/try', (req, res) => {
    console.log(req.body)
  })

