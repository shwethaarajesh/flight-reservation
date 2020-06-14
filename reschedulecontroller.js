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
app.get('/rescheduleflight',(req,res,html)=>{
    sess=req.session;
    console.log(sess.mob);
    printrescheduled(sess.mob,res);
})

app.post('/reschedule',(req,res)=>{
    sess=req.session;
    console.log(sess.mob);
    reschedule(req,res,sess.mob);
    res.redirect('/options');
})

function reschedule(req,res,mob)
{
    var c1=bookf.find({mobileno:mob,datetravel:req.body.date},(err,result)=>{

        if(!err & result!='')
        {
            var n=result[0].toObject().nseats;
            var uname=result[0].toObject().name;
            console.log('input '+req.body)
            var r1= reserve.updateMany({flightid: req.body.fid, datetravel:req.body.date},{$inc: {seats:n}},(er,doc)=>{
                if (er) {
    
                  console.log("Error in reserve update reschedule"+er);
          
              } 
              else if(doc=='')
              {
                console.log('No corrsponding file in reserve reschedule line 48');
              }
              else {
                  
                console.log(doc);
                console.log("Reserve document update is a success");

                var r2= bookf.findOneAndDelete({mobileno:mob,flightid:req.body.fid,datetravel:req.body.date},(error,r)=>{
                    if(err)
                    {
                        console.log('Error during find one and delete booking reschedule'+err);

                    }
                    else if(r!='')
                    {
                        console.log('Booking has been cancelled!');
                    }
                    else
                    {
                        console.log('No corresponding bookings in reschedule');
                    }
                });
          
          
                reserveb(req,res,n,uname);
              }
              });
        }
    })
}
function reserveb(req,res,n,uname)
{
  var res= new reserve();
  console.log('printing n '+n);
    
  var c1= reserve.find({ flightid: req.body.fid, datetravel: req.body.ndate },(err, result)=>{
    var c2= flight.find({flightid: req.body.fid},(e,r)=>{
      if(!e & r!=''){
      if(!err & result!=''){
      
          console.log('Reservation already present reschedule');
          var r1= reserve.updateMany({flightid: req.body.fid, datetravel:req.body.ndate, seats :{$gt : n}},{$inc: {seats:-n}},(er,doc)=>{
            if (er) {

              console.log("Could not update reserve in reschedule reserveb"+er);
      
          }
          else if(doc=='')
          {
            console.log('Could not find corresponding reserve in reserveb reschedule')
          }
           else {
              
            console.log(doc);
            console.log("Reserve document updation is a success");
            
            sess=req.session;
            insertbook(req,res,r,sess.mob,n,uname);
      
      
          }
          });
    
      }
      else if(!err)
      {
        sess=req.session;
        insertReserve(req,res,r,sess.mob,n,uname);

      }
      else {
          console.log('Error in retrieving reserved list '+err);
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
function insertReserve(req,res,r,mobn,n,uname)
{
  var nr= new reserve();
  nr.flightid=req.body.fid;
  nr.seats= (r[0].toObject().seats)-n;
  nr.datetravel=req.body.ndate;
  nr.save((err,doc)=> {
      if(!err)
      {
        insertbook(req,res,r,mobn,n,uname);

      }
          
      else
          console.log('Error during record insertion for reserve'+err);
  }
  );
}
function insertbook(req,res,r,mobn,n,uname)
{
  var booknew= new bookf();
        booknew.name=uname;
        booknew.flightid=req.body.fid;
        booknew.mobileno=mobn;
        booknew.nseats=n;
        booknew.datetravel=req.body.ndate;
        booknew.from =r[0].toObject().from;
        booknew.to=r[0].toObject().to;
        booknew.save((e,d)=>{
          if(!e)
          {
            
            console.log('Inserted into book reschedule');
          }
          else
            console.log('Cannot insert in book reschedule'+e);
        });
}
function printrescheduled(req,res)
{
    var c1= bookf.find({ mobileno: req },(err, result)=>{
            if(!err & result!='')
            {
                res.render('rescheduleflight',{data:result});
            }
            else if (!err)
            { res.render('nobookingsoption');}
            else
            {
                console.log('Error'+err)
            }
    })
} 




module.exports=app;