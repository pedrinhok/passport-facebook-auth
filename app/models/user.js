const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  facebook: {
    id: String,
    accessToken: String
  }
})

module.exports = mongoose.model("User", userSchema)
