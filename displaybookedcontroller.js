const express = require('express');
var app = express();
var JSAlert = require("js-alert");
var router = express.Router();
const path = require('path');
const exphb = require('express-handlebars');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

var userdisplaycontroller= require('./userdetailscontroller');
flights= require('./modules/flight.model');
bookflight=require('./modules/book.model');
reservedflight=require('./modules/reserved.model');
userinfo=require('./modules/user.model');

const flight=mongoose.model('Flightschema');
const reserve=mongoose.model('Reservedschema');
const bookf= mongoose.model('bookschema');
app.get('/checkbooked',(req,res,html)=>{
        sess=req.session;
        printbooked(sess.mob,res);

    })
function printbooked(req,res)
{
    var c1= bookf.find({ mobileno: req },(err, result)=>{
            if(!err & result!='')
            {
                res.render('printbooked',{data:result});
            }
            else if (!err)

            {console.log('No bookings by user'+req)
            res.render('nobookingsoption')
        }
            else
            {
                console.log('Error during finding bookings '+err)
            }
    });
} 



module.exports=app;