const express = require('express')
const router = express.Router()
const { User } = require('../models/User')


// localhost:3000/users/register
router.post('/register', function(req, res){
    const body = req.body
    const user = new User(body)
    user.save()
        .then(function(user){
                res.send({
                    user,
                    notice:"Successfuly Registered.."
                })
        })
        .catch(function(err){
            res.send(err)
        })
})

// localhost:3000/users/login
router.post('/login', function(req, res){
    const body = req.body

    User.findByCredentials(body.email, body.password)
    .then(function(user){
        res.send(user)
    })
    .catch(function(err){
        res.send(err)
    })
})

// localhost:3000/users/logout

// localhost:3000/users/account 

// localhost:3005/users
router.get('/', function(res, res){
    User.find()
    .then(function(users){
        res.send(users)
    })
    .catch(function(err){
        res.send(err)
    })
})

module.exports = {
    usersRouter: router
}