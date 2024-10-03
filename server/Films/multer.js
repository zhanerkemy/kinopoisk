const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) { //cb - callback
        cb(null, './public/images/films')
    },
    filename: function(req, file, cb) {
        // myimage.jpeg
        let ext = file.originalname.split(".") //мы все делим расширение через точку
        ext = ext[ext.length - 1]
        // 8e89023938.jpeg
        const unique = Date.now() + '.' + ext //Date.now() - время загруженного файла
        cb(null, unique)
    }
})

const upload = multer({storage})

module.exports = {upload}