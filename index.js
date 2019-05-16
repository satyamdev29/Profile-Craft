const express = require('express')
//npm install --save cors
const cors = require('cors')
const {mongoose} = require('./config/database')
const {routes} = require('./config/routes')

const app = express()
const port = 3005

// configure express to use json data
app.use(express.json()) // to data as json format

// cors issue fixing
app.use(cors())

// route matching
app.use('/', routes)

// listening server port
app.listen(port, function(){
    console.log('listening on port', port)
})