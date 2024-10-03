const createFilm = (req, res) => {
    console.log(req.body);
    res.send('ok')
}

module.exports = {
    createFilm
}