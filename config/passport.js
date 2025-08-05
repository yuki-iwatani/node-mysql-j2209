const passport = require("passport");
const LocalStrategy = require("passport-local");
const knex = require("../db/knex");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const flash = require('connect-flash');

module.exports = function (app) {
 passport.serializeUser(function(user, done) {
  console.log("serializeUser");
  done(null, user.id);
});

  passport.deserializeUser(async function (id, done) {
 console.log("deserializeUser");
 try {
 const user = await User.findById(id);
 done(null, user);
 } catch (error) {
 done(error, null);
 }
});

  passport.use(new LocalStrategy({
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true
}, async function (req, username, password, done) {
  try {
    const results = await knex("users").where({ name: username }).select("*");
    if (results.length === 0) {
      req.flash('error', 'Invalid User');
      return done(null, false);
    }
    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      req.flash('error', 'Invalid User');
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));


  app.use(flash()); 

  app.use(passport.initialize());
  app.use(passport.session());
};