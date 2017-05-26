module.exports = {
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/callback",
  profileURL: "https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email",
}