///////////////////////////////////////////////////////////////
// Require Packages need to include / Add
///////////////////////////////////////////////////////////////

const mongoose = require('mongoose')

///////////////////////////////////////////////////////////////
// Configure Mongoose & Establish a DB Connection with MongoDB
///////////////////////////////////////////////////////////////

// confgure mongoose to use global promises
mongoose.Promise = global.Promise

// Establish a database connection
mongoose.connect('mongodb://localhost:27017/profile-craft', { useNewUrlParser: true, useCreateIndex: true })
    .then(function(){
        console.log('connected to db')
    })
    .catch(function(err){
        console.log('error: connecting to db')
})

module.exports = {
    mongoose
}