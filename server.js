// FIRST GO TO MONGODB.JS TO ESTABLISH CONNECTION WITH MONGO
require('./modules/mongodb');
//COMES BACK
const express = require('express');
var app = express();
var router = express.Router();
const path = require('path');
const exphb = require('express-handlebars');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

flights= require('./modules/flight.model');
bookflight=require('./modules/book.model');
reservedflight=require('./modules/reserved.model');
userinfo=require('./modules/user.model');
const log = mongoose.model('Userschema');
app.use(bodyparser.urlencoded({
    extended: true
    }));
app.use(bodyparser.json({})); // parse application/json
//THIS REDIRECTS IT TO OUR HOME PAGE WHICH IS INDEX.HTML
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})
//IN POST WE USE /TRIAL SINCE THAT'S THE FORM ACTION IN IN INDEX
app.post('/login', (req, res) => {
    //WE ARE REDIRECTING TO A NEW PAGE /WORKPLEASE
    var cursor= log.find({ mob: req.body.mob, password : req.body.password },(err, result)=>{
        if(!err & result!=''){
            console.log(req.body)
            res.redirect('/workplease');
        }
        else {
            console.log('Error in retrieving employee list '+err+result);
            console.log(result);
            res.redirect('/');
        }
    });/*
    var cursor= log.find({ mob: req.body.mob, password : req.body.password },(err, result)=>{
        if(!err & result!=''){
            console.log(req.body)
            res.redirect('/workplease');
        }
        else {
            console.log('Error in retrieving employee list '+err+result);
            console.log(result.name);
            res.redirect('/');
        }
    });*/
});

//THIS IS IF THEY SIGNED UP
  app.post('/signup', (req, res) => {
    //WE ARE REDIRECTING TO A NEW PAGE /WORKPLEASE
    insertRecord(req,res);
    //console.log('Yes');
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
            res.redirect('/workplease');
        else
            console.log('Error during record insertion '+err);
    });
}
//THIS GETS THE NEW WORKPLEASE PAGE AND IS REDIRECTED TO WORK.HTML
  app.get('/workplease',(req,res)=>{
    res.sendFile(__dirname + '/work.html')
})
//THIS GETS IT BACK FROM WORK AND PRINTS
app.post('/try', (req, res) => {
    console.log(req.body)
  })
/*
    app.use('/movie', movies);
    app.use('/city',city);
    app.use('/theatre',theatre);
    app.use('/showtime',showtime);
    app.use('/assign',assign);
    app.use('/book',book);

    

//API to accept details of movie screen
app.post('/screens', async (req, res) => {

  try {
    let screen = new Screen(req.body);
    await screen.save();
    res.send();
  } catch (e) {
      res.status(400).send(e);
  }

});

//API to reserve tickets for given seats in a given screen
app.post('/screens/:screen_name/reserve', async (req, res) => {

  try {
    let screenName = req.params.screen_name;
    let seats = req.body.seats;
    await isAvailable(screenName, seats);
    res.send("Reservation is successful");
  } catch (e) {
      res.status(400).send(e);
  }

});

/*
API to get the available seats for a given screen
And also
API to get information of available tickets at a given position
Same endpoint will be used for both. We will differentiate from queries.

app.get('/screens/:screen_name/seats', async (req, res) => {

  try {
    let query = req.query;
    if(query.status && query.status === 'unreserved'){//to get the available seats for a given screen
      let unreservedSeats = await getUnreservedSeats(req.params.screen_name);
      res.send(unreservedSeats);
    }else if (query.numSeats && query.choice) {//to get information of available tickets at a given position
      let seatOfChoice = await getSeatAvailableAtChoice(req.params.screen_name, query.numSeats, query.choice);
      res.send(seatOfChoice);
    }else {//return error 404 if any other endpoint is used.
      return res.status(404).send('Page not found');
    }
  } catch (e) {
      res.status(400).send(e);
  }

});

*/
app.listen(3000, function() {
    console.log('listening on 3000')
  })
module.exports = {app};
