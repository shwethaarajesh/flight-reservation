const express = require('express');
var app = express();
var JSAlert = require("js-alert");
var router = express.Router();
const path = require('path');
const exphb = require('express-handlebars');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

flights= require('./modules/flight.model');
bookflight=require('./modules/book.model');
reservedflight=require('./modules/reserved.model');
userinfo=require('./modules/user.model');

const flight=mongoose.model('Flightschema');
const reserve=mongoose.model('Reservedschema');
const bookf= mongoose.model('bookschema');
const log = mongoose.model('Userschema');

app.get('/allusers',(req,res,html)=>{

    getdetails(req,res);
})
function getdetails(mobno,res)
{
    var c1= log.find({ },(err, result)=>{
        if(!err & result!='')
        {
            res.render('aprintuserdetails',{data:result});
        }
        else if (!err)
        {
            console.log('No users ');
        }
        else
        {
            console.log('Error during finding user'+err)
        }
    })
}
module.exports=app;