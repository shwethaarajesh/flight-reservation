const express = require('express');
var app = express();
var router = express.Router();
const path = require('path');
const exphb = require('express-handlebars');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

const session = require('express-session');
var flightcontroller= require('./flightcontroller');
flights= require('./modules/flight.model');
bookflight=require('./modules/book.model');
reservedflight=require('./modules/reserved.model');
userinfo=require('./modules/user.model');
const log = mongoose.model('Userschema');
var sess;
app.get('/',(req,res)=>{
  sess=req.session;
  sess.mob;
  res.render('index');

})

app.post('/login', (req, res) => {
    sess=req.session;
    var cursor= log.find({ mob: req.body.mob, password : req.body.password },(err, result)=>{
    if(!err & result!=''){
        //console.log(req.body)
        sess.mob=req.body.mob;
        //console.log(sess.mob);
        res.redirect('/options');
    }
    else if(err)
    {
      console.log('Error during login '+err);
    }
    else {
        console.log('No such user to login');
        //console.log(result);
        res.redirect('/');
    }
    });
});
app.get('/signup', function (req, res,html) {
  res.render('signup');
 });

app.post('/signup', (req, res) => {
    insertRecord(req,res);
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
            console.log('Error during record insertion for signup'+err);
    });
}
console.log('Hi');
app.use('/',flightcontroller);

module.exports = app;