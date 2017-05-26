const port = 8080

require("./config/database")
require("dotenv").config()

const express = require("express")
const app = express()
const session = require("express-session")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const passport = require("passport")

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: "passport-facebook-auth", resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(require('./config/cors'))
require("./app/routes")(app, passport)

app.listen(port, function(){
  console.log(`running on port ${port}`)
})

module.exports = app
