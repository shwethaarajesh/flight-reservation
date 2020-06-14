// FIRST GO TO MONGODB.JS TO ESTABLISH CONNECTION WITH MONGO
require('./modules/mongodb');
//COMES BACK
const express = require('express');
var app = express();

const session = require('express-session');
var router = express.Router();
const path = require('path');
const exphb = require('express-handlebars');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
var usercontroller= require('./usercontroller');

app.use(session({secret: 'ssshhhhh',saveUninitialized: true,resave: true}));
app.use(bodyparser.urlencoded({
  extended: true
  }));
  
  app.use(express.static(path.join(__dirname, '/views')));

app.use(bodyparser.json({})); // parse application/json

app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views'); // general config
app.set('view engine', 'html');
app.listen(3000, function() {
    console.log('listening on 3000')
  })
  
 app.use('/',usercontroller);
module.exports = {app};
