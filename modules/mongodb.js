const mongoose = require('mongoose');
//AIRLINERESERVATION IS THE DBNAME
mongoose.connect('mongodb://localhost:27017/airlinereservation', {useNewUrlParser: true}, (err) => {
if (!err) {
console.log('Successfully Established Connection with MongoDB')
}
else {
console.log('Failed to Establish Connection with MongoDB with Error: '+ err)
}
});
//CREATING ALL THE SCHEMA AND TABLES WITHIN MODULES
//CONTROL RETURNED TO SERVER
require('./flight.model');
require('./book.model');
require('./reserved.model');
require('./user.model');