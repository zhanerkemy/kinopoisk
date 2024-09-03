const Genres = require('./Genres')
const data = [
    'Комедии',
    'Мультфильмы',
    'Ужасы',
    'Фантастика',
    'Боевик',
    'Мелодрамы',
    'Детективы',
    'Приключения'
]

async function writeDataGenre(){
    const length = await Genres.countDocuments();
    if(length == 0){
        data.map((item, index) => {
            new Genres({
                name: item,
                key: index
            }).save()
        })
    }
}

module.exports = writeDataGenre