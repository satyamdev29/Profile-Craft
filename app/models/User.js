const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema({
    userfirstname: {
        type: String,
        required: true,
        minlength: 5
    },
    userlastname: {
        type: String
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 128
    },    
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return validator.isEmail(value)
            },
            message: function () {
                return 'invalid email format'
            }
        }   
    },
    createdAt:{
        type: Date,
        default:Date.now
    }
})

// Pre Hook - Mongoose Middleware // es5 function
userSchema.pre('save', function (next) {
    const user = this
    if (user.isNew) { // if user is new then only insert in database
        bcryptjs.genSalt(10)
            .then(function (salt) {
                bcryptjs.hash(user.password, salt)
                    .then(function (encryptedPassword) {
                        user.password = encryptedPassword
                        next() // after encryted password this will call to save() method which is used in UsersController.jsc
                    })
            })
    } else {
        next()
    }
})

// own static method to check user login/ password
userSchema.statics.findByCredentials = function (email, password) {
    const User = this
    return User.findOne({ email })
        .then(function (user) {
            if (!user) {
                return Promise.reject({errors:'invalid email / password'})
            }
            return bcryptjs.compare(password, user.password)
                .then(function (result) {
                    if (result) {
                        return Promise.resolve(user) // short hand property 
                        // return new Promise(function(resolve, reject){
                        //     resolve(user)
                        // })
                    } else {
                        return Promise.reject({errors:'invalid email / password'})
                        // return new Promise(function(resolve, reject){
                        //     reject('invalid email / password')
                        // })
                    }
                })
        })
        .catch(function (err) {
            return Promise.reject(err)
            // return new Promise(function(resolve, reject){
            //  reject(err) 
            // })
        })
}


const User = mongoose.model('User', userSchema)

module.exports = {
    User
}