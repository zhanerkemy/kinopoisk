const mongoose = require('mongoose')

const userSChema = new mongoose.Schema({
    email: String, 
    full_name: String,
    password: String
})

module.exports = mongoose.model('user', userSchema)