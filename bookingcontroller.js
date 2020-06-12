const express = require('express');
var app = express();
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
app.get('/bookflight',(req,res,html)=>{
    
  res.sendFile(__dirname + '/getlocation.html')
    //res.sendFile(__dirname + '/bookflight.html')
  })

app.post('/location', (req, res) => {

      console.log(req.body);
      checkflights(req,res);
    })

function checkflights(req,res)
{

  var c1= flight.find({ from: req.body.from,to: req.body.to },(err, result)=>{
    if(!err & result!=''){
      
      res.render('listofflights',{data:result}); 
 
    }
    else {
        console.log('Error in retrieving flights '+err+result);
        console.log(result);
        res.redirect('/bookflight');
    }
});
}
app.post('/book', (req, res) => {
  console.log(req.body);
  reservebook(req,res);
})

function reservebook(req,res)
{
  var res= new reserve();
    
  var c1= reserve.find({ flightid: req.body.flightid, datetravel: req.body.date },(err, result)=>{
    var c2= flight.find({flightid: req.body.flightid},(e,r)=>{
      if(!e & r!=''){
      if(!err & result!=''){
      
          console.log('Already present');
          var r1= reserve.updateMany({flightid: req.body.flightid, datetravel:req.body.date, seats :{$gt : req.body.seats}},{$inc: {seats:-req.body.seats}},(er,doc)=>{
            if (er) {

              console.log("update document error");
      
          } else {
              
            console.log(doc);
              console.log("update document success");
      
      
          }
          });
    
      }
      else if(!err)
      {
        console.log(r);
        insertReserve(req,res,r);
      }
      else {
          console.log('Error in retrieving employee list '+err+result);
          console.log(result);
          res.redirect('/');
      }
      }
      else
      {
        console.log('No such flight exists')
      }
    
   
 } );
});
function insertReserve(req,res,r)
{
  var nr= new reserve();
  nr.flightid=req.body.flightid;
  nr.date=req.body.date;
  nr.seats= r[0].toObject().seats;
  nr.datetravel=req.body.date;
  nr.save((err,doc)=> {
      if(!err)
      {
        console.log(doc);  
        var booknew= new bookf();
        booknew.name=req.body.name;
        booknew.flightid=req.body.flightid;
        booknew.mobileno=req.body.mob;
        booknew.nseats=req.body.seats;
        booknew.datetravel=req.body.date;
        booknew.from =r[0].toObject().from;
        booknew.to=r[0].toObject().to;
        booknew.save((e,d)=>{
          if(!err)
            console.log('Inserted',r.seats);
          else
            console.log('Cannot insert in book');
        })

      }
          
      else
          console.log('Error during record insertion for reserve'+err);
  }
  );
}
}
module.exports=app;