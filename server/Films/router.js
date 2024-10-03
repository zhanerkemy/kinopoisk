const express = require('express')
const router = express.Router()
const {upload} = require('./multer')
const {createFilm} = require('./controller')

// router.post('api/new', createFilm)
router.post('/api/new', (req, res) => {
    console.log(req.body);
    res.send('ok')
})

module.exports = router