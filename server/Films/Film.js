const mongoose = require('mongoose')

const FilmSchema = new mongoose.Schema({
    titleRus: String,
    titleEng: String,
    year: Number, 
    time: String,
    country: {type: Schema.Types.ObjectId, ref: 'Country'},
    genre: {type: Schema.Types.ObjectId, ref: 'Genre'},
    image: String
}) 

module.exports = mongoose.model('film', FilmSchema)