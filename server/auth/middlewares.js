//Middlewares - функция которая работает с проверкой данных

const isAuth = (req, res, next) => {
    if(req.user ){ // && req.user.isAdmin
        next()
    } else{
        res.status(401).send('Unauthorized')
    }
}

module.exports = {
    isAuth
}