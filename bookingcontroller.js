const express = require('express');
var app = express();
var JSAlert = require("js-alert");
var router = express.Router();
const path = require('path');
const exphb = require('express-handlebars');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

var displaycontroller= require('./displaybookedcontroller');
flights= require('./modules/flight.model');
bookflight=require('./modules/book.model');
reservedflight=require('./modules/reserved.model');
userinfo=require('./modules/user.model');
app.use('/',displaycontroller);
const flight=mongoose.model('Flightschema');
const reserve=mongoose.model('Reservedschema');
const bookf= mongoose.model('bookschema');
app.get('/bookflight',(req,res,html)=>{
    res.render('getlocation');
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

        console.log('Error in retrieving flights '+err);
        res.redirect('/bookflight');
    }
});
}
app.post('/book', (req, res) => {
  console.log(req.body);
  reservebook(req,res);
  res.redirect('/options');
})

function reservebook(req,res)
{
  var res= new reserve();
    
  var c1= reserve.find({ flightid: req.body.flightid, datetravel: req.body.date },(err, result)=>{
    var c2= flight.find({flightid: req.body.flightid},(e,r)=>{
      if(!e & r!=''){
      if(!err & result!=''){
          var r1= reserve.updateMany({flightid: req.body.flightid, datetravel:req.body.date, seats :{$gt : req.body.seats}},{$inc: {seats:-req.body.seats}},(er,doc)=>{
            if (er) {

              console.log(" cannot update reserve to book new flight "+er);
      
          } else {
            console.log("Reserve document is updated successfully");
            
            sess=req.session;
            insertbook(req,res,r,sess.mob);
      
      
          }
          });
    
      }
      else if(!err)
      {
        sess=req.session;
        console.log(r);
        insertReserve(req,res,r,sess.mob);

      }
      else {
          console.log('Error while accessing reserve to book new flight '+err);
          res.redirect('/options');
      }
      }
      else
      {
        console.log('No such flight exists')
      }
    
   
 } );
});
}
function insertReserve(req,res,r,mobn)
{
  var nr= new reserve();
  nr.flightid=req.body.flightid;
  nr.date=req.body.date;
  nr.seats= r[0].toObject().seats-req.body.seats;
  nr.datetravel=req.body.date;
  nr.save((err,doc)=> {
      if(!err)
      {
        console.log(doc);  
        var booknew= new bookf();
        booknew.name=req.body.name;
        booknew.flightid=req.body.flightid;
        booknew.mobileno=mobn;
        booknew.nseats=req.body.seats;
        booknew.datetravel=req.body.date;
        booknew.from =r[0].toObject().from;
        booknew.to=r[0].toObject().to;
        booknew.save((e,d)=>{
          if(!e)
          {
            
            console.log('Inserted into books');
          }
          else
            console.log('Cannot insert new in book'+e);
        });

      }
          
      else
          console.log('Error during record insertion for reserve'+err);
  }
  );
}
function insertbook(req,res,r,mobn)
{
  var booknew= new bookf();
        booknew.name=req.body.name;
        booknew.flightid=req.body.flightid;
        booknew.mobileno=mobn;
        booknew.nseats=req.body.seats;
        booknew.datetravel=req.body.date;
        booknew.from =r[0].toObject().from;
        booknew.to=r[0].toObject().to;
        booknew.save((e,d)=>{
          if(!e)
          {
            
            console.log('Inserted into book');
          }
          else
            console.log('Cannot insert into book'+e);
        });
}
module.exports=app;