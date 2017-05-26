module.exports = function(app, passport) {

  app.get("/", isAuthenticated, function(req, res, next){
    res.send({ message: "passport-facebook-auth" })
  })

  app.get("/me", isAuthenticated, function(req, res, next){
    res.send(req.user)
  })

  app.get("/logout", isAuthenticated, function(req, res){
    req.logout()
    res.send({ message: "logout" })
  })

  app.get("/auth/facebook",
    passport.authenticate("facebook", { scope : "email" })
  )

  app.get("/auth/facebook/callback",
    passport.authenticate("facebook"),
    function(req, res, next){
      res.send(req.user)
    }
  )

}

function isAuthenticated(req, res, next){
  if(req.isAuthenticated()) return next()
  res.send(401, { message: "not authenticated" })
}
