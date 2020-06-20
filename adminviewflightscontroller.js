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

app.get('/allflights',(req,res,html)=>{

    getdetails(req,res);
})

function getdetails(mobno,res)
{
    var c1= flight.find({ },(err, result)=>{
        if(!err & result!='')
        {
            res.render('printflights',{data:result});
        }
        else if (!err)
        {
            console.log('No flights ');
        }
        else
        {
            console.log('Error during finding user'+err)
        }
    })
}
module.exports=app;