var passport = require('koa-passport')
var conf = require('./conf')
var LocalStrategy = require('passport-local').Strategy
var GoogleStrategy = require('passport-google').Strategy
var TwitterStrategy = require('passport-twitter').Strategy

var user = { id: 1, username: 'test' }

passport.serializeUser(function(user, done) {
  done(null, user.id)
})

passport.deserializeUser(function(id, done) {
  done(null, user)
})

passport.use(new LocalStrategy(function(username, password, done) {
  // retrieve user ...
  if (username === 'test' && password === 'test') {
    done(null, user)
  } else {
    done(null, false)
  }
}))

passport.use(new TwitterStrategy({
    consumerKey: conf.twitter.consumerKey,
    consumerSecret: conf.twitter.consumerSecret,
    callbackURL: 'http://127.0.0.1:' + (process.env.PORT || 3000) + '/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, done) {
    // retrieve user ...
    done(null, user)
  }
))

passport.use(new GoogleStrategy({
    returnURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/google/callback',
    realm: 'http://localhost:' + (process.env.PORT || 3000)
  },
   function(identifier, profile, done) {
    // retrieve user ...
    done(null, user)
  }
))

module.exports = passport;
