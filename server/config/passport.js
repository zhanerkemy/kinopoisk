const passport = require('passport')
const User = require('../auth/User')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')

passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function(email, password, done){
        User.findOne({email}).then(user => {
            if(user && user.password){
                bcrypt.compare(password, user.password, function(err, result){
                    if(err) {return done(err)}
                    if(result) {return done(null, user)}
                });
            } else{
                return done('Пользователь не найден');
            }
            
        }).catch(e => {
            return done(e)
        })
    }
));

passport.serializeUser(function(user, done){
    // console.log(user);
    done(null, user._id)
})

passport.deserializeUser(function(id, done){ //it works in every loading, we will get id
    User.findById(id).then((user, err) => {
        // console.log(id);
        done(err, user)
    })
})

//we need serialize and deserialize to get information about user in any page by adding console.log(req.user) to pages (router.js)