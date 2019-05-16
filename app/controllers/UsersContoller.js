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

// // localhost:3000/users/login
// router.post('/login', function(req, res){
//     const body = req.body
//     let currentUser
//     User.findOne({email:body.email})
//         .then(function(user){
//             if(!user){ //if user with email not found
//                 res.status('404').send('invalid email/ password')
//             }
//             currentUser = user // set this up so that, we can use it in the next then method
//             return bcrypt.compare(body.password, user.password)
//         })

//         .then(function(result){
//             if(result){
//                 res.send(currentUser)
//             } else{
//                 res.send('invalid email/ passwword')
//             }
//         })
    
// })

// localhost:3000/users/logout

// localhost:3000/users/account 


module.exports = {
    usersRouter: router
}