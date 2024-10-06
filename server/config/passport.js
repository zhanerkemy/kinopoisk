const passport = require('passport')
const User = require('../auth/User')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;
//Client id: 372397368408-6ko206j1e16uusk7qgv0b0f0qnmuiqff.apps.googleusercontent.com
//Client secret: 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

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

passport.use(new GoogleStrategy({
    clientID:     '372397368408-6ko206j1e16uusk7qgv0b0f0qnmuiqff.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8000/api/auth/google",
    scope: ['openid', 'email', 'profile'],
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    const user = await User.find({googleId: profile.id})
    console.log(profile);
    const newUser = await new User({
        googleId: profile.id,
        full_name: profile.displayName,
        email: profile.emails[0].value
    }).save()
    return done(null, newUser);
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