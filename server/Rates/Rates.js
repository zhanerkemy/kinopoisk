const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RateSchema = new mongoose.Schema({
    rate: Number, 
    text: String,
    filmId: {type: Schema.Types.ObjectId, ref: 'film'},
    authorId: {type: Schema.Types.ObjectId, ref: 'user'},
    timeStamps: {
        date: 'date'
    }
})

module.exports = mongoose.model('rate', RateSchema)