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

app.get('/cancelflight',(req,res,html)=>{
    sess=req.session;
    printbookedc(sess.mob,res);
})

app.post('/cancel',(req,res)=>{
    sess=req.session;
    cancel(req,res,sess.mob)
    res.redirect('/options');
})
function cancel(req,res,mob)
{
    var c1=bookf.find({mobileno:mob,datetravel:req.body.date},(err,result)=>{

        if(!err & result!='')
        {
            var n=result[0].toObject().nseats;
            var r1= reserve.updateMany({flightid: req.body.fid, datetravel:req.body.date},{$inc: {seats:n}},(er,doc)=>{
                if (er) {
    
                  console.log("Cannot update reserve error during cancel "+er);
          
              } 
              else if(doc=='')
              {
                  
                console.log('Could not find matching documents in reserve cancel');

                
              }
              else {
                  
                console.log("Successfully updated reserve during cancel");
                var r2= bookf.findOneAndDelete({mobileno:mob,flightid:req.body.fid,datetravel:req.body.date},(error,r)=>{
                    if(err)
                    {
                        console.log('Error during booking cancellation'+err);

                    }
                    else if(r!='')
                    {
                        console.log('Successfully cancelled!');
                    }
                    else
                    {
                        console.log('No bookings in book cancel');
                    }
                })
          
          
              }
              });
        }
    })
}
function printbookedc(req,res)
{
    var c1= bookf.find({ mobileno: req },(err, result)=>{
            if(!err & result!='')
            {
                res.render('cancelflight',{data:result});
            }
            else if (!err)
            {   res.render('nobookingsoption');}
            else
            {
                console.log('Error in printbooked '+err)
            }
    })
} 


module.exports=app;