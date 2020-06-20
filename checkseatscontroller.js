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

app.get('/allflightseats',(req,res,html)=>{
    res.render('getfdetails');

})

app.post('/checkseats', (req, res) => {

    console.log(req.body);
    checkres(req,res);
  })

  function checkres(req,res)
  {
  
    var c1= reserve.find({ datetravel: req.body.date,flightid: req.body.fid },(err, result)=>{
      if(!err & result!=''){
        
        res.render('printres',{data:result}); 
   
      }
      else if(!err)
      {
          newres(req,res);
      }
      else {
  
          console.log('Error in retrieving flights '+err);
          res.redirect('/bookflight');
      }
  });
  }
function newres(req,res)
{
    var a=flight.find({flightid:req.body.fid},(e,r)=>{
        if(!e & r!='')
        {
            var seats=r[0].toObject().seats;
            var nr= new reserve();
            nr.flightid=req.body.fid;
            nr.seats=seats;
            nr.datetravel=req.body.date;
            nr.save((err,doc)=> {
                if(!err)
                    checkres(req,res);
                else
                    console.log('Error during reserve insertion '+err);
            });
        }
        else if(!e)
        {
            console.log('No such flight');
        }
        else
        {
            console.log('Error in getting flight seats check seats'+e);
        }
    })
}
module.exports=app;