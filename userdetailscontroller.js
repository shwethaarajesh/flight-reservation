const express = require('express');
var app = express();
var JSAlert = require("js-alert");
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
const reserve=mongoose.model('Reservedschema');
const bookf= mongoose.model('bookschema');
const log = mongoose.model('Userschema');

app.get('/getuserdetails',(req,res,html)=>{
    sess=req.session;
    console.log(sess.mob);
    getdetails(sess.mob,res);
})
function getdetails(mobno,res)
{
    var c1= log.find({ mob: mobno },(err, result)=>{
        if(!err & result!='')
        {
            res.render('printuserdetails',{data:result});
        }
        else if (!err)
        {
            console.log('Cannot find user ');
        }
        else
        {
            console.log('Error during finding user'+err)
        }
    })
}
module.exports=app;