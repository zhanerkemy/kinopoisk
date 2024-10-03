const express = require('express')
const session = require('express-session')
const mongooseStore = require('connect-mongo')
const passport = require('passport')

const app = express()

require('./server/config/db')
require('./server/config/passport')

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded()) //for auth post method
app.use(session({
    name: 'kinopoisk.session',
    secret: 'keyboard cat', //secret key
    maxAge: 1000 * 60 * 60 * 7, // e.g. 1000 ms 60 s 60 min 7 days -> maximum 7 days can be kept information about user
    resave: false,
    store: mongooseStore.create({
        mongoUrl: 'mongodb://localhost:27017'
    }) 
}))
app.use(passport.initialize())
app.use(passport.session())

app.set("view engine", "ejs")

app.use(require('./server/pages/router'))
app.use(require('./server/Genres/router'))
app.use(require('./server/Country/router'))
app.use(require('./server/auth/router'))
app.use(require('./server/Films/router'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const PORT = 8000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})