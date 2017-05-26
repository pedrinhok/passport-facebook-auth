var FacebookStrategy = require("passport-facebook").Strategy
var FacebookAuth = require("./facebook-auth")
var User = require("../app/models/user")

module.exports = function(passport){

  passport.serializeUser(function(user, done){
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
      done(err, user)
    })
  })

  FacebookAuth.passReqToCallback = true
  passport.use(new FacebookStrategy(
    FacebookAuth,
    function(req, accessToken, refreshToken, profile, done){
      process.nextTick(function(){
        if(!req.user){
          User.findOne({ "facebook.id": profile.id }, function(err, user){
            if(err) return done(err)
            if(user){
              user.facebook.accessToken = accessToken
              return save(user, done)
            }else{
              user = new User({
                name: getName(profile),
                email: getEmail(profile),
                facebook: {
                  id: profile.id,
                  accessToken: accessToken
                }
              })
              return save(user, done)
            }
          })
        }else{
          var user = req.user
          user.facebook.accessToken = accessToken
          return save(user, done)
        }
      })
    }
  ))

}

function getEmail(profile){
  return profile.emails[0].value || ""
}

function getName(profile){
  return `${profile.name.givenName} ${profile.name.familyName}`
}

function save(user, done){
  user.save(function(err){
    if(err) return done(err)
    return done(null, user)
  })
}
