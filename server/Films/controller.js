const Film = require('./Film')
const User = require('../auth/User')
const fs = require('fs')    //these two libraries are used in deleting images
const path = require('path')

const createFilm = async (req, res) => {
    if(req.file &&
        req.body.titleRus.length > 2 && 
        req.body.titleEng.length > 2 &&
        req.body.year > 0 &&
        req.body.time > 10 &&
        req.body.country.length > 2 &&
        req.body.genre.length > 2)
        {
            await new Film({
                titleRus: req.body.titleRus,
                titleEng: req.body.titleEng,
                year: req.body.year, 
                time: req.body.time,
                country: req.body.country,
                genre: req.body.genre,
                image: `/images/films/${req.file.filename}`,
                author: req.user._id
            }).save()
            res.redirect(`/admin/${req.user._id}`)
            // res.redirect('/new')
    } else{
        res.redirect('/new?error=1')
    }
}

const editFilm = async (req, res) => {
    if( req.file &&
        req.body.titleRus.length > 2 && 
        req.body.titleEng.length > 2 &&
        req.body.year > 0 &&
        req.body.time > 10 &&
        req.body.country.length > 0 &&
        req.body.genre.length > 0
    ){
        const films = await Film.findById(req.body.id)
        fs.unlinkSync(path.join(__dirname + '../../../public' + films.image)) //delete img
        films.titleRus = req.body.titleRus;
        films.titleEng = req.body.titleEng;
        films.year = req.body.year;
        films.time = req.body.time;
        blog.country = req.body.country;
        films.genre = req.body.genre;
        films.image = `/images/films/${req.file.filename}`; 
        films.author = req.user._id;
        films.save();  //--> 1st method
        // await Film.findByIdAndUpdate(req.body.id, {
        //     titleRus: req.body.titleRus,
        //     titleEng: req.body.titleEng,
        //     year: req.body.year,
        //     time: req.body.time,
        //     country: req.body.country,
        //     genre: req.body.genre,
        //     image: `/images/films/${req.file.filename}`,
        //     author: req.user._id
        // })
        res.redirect('/admin/' + req.user._id)
    } else{
        res.redirect(`/edit/${req.body.id}?error=1`) 
    }
}

const deleteFilm = async(req, res) => {
    const film = await Film.findById(req.params.id)
    if(film){
        fs.unlinkSync(path.join(__dirname + '../../../public' + film.image))
        await Film.deleteOne({_id: req.params.id})
        res.status(200).send('ok')
    } else{
        res.status(404).send('Not found')
    }
}

const saveFilm = async(req, res) => {
    if(req.user && req.body.id){
        const user = await User.findById(req.user._id)
        const findFilm = user.toWatch.filter(item => item._id == req.body.id);
        // console.log(findFilm);    
        // user.toWatch = []
        if(findFilm.length == 0){
            user.toWatch.push(req.body.id);
            user.save()
            res.send('Фильм успешно сохранен')
        } else{
            res.send('Фильм уже сохранен')
        }
    }
}

module.exports = {
    createFilm,
    editFilm,
    deleteFilm,
    saveFilm
}