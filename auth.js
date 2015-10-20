var express = require('express'),
    auth = express.Router(),
    passport = require('passport'),
    localStrategy = require('passport-local' ).Strategy,
    // TwitterStrategy = require('passport-twitter').Strategy,
    User = require('./models').User;

// use passport
auth.use(passport.initialize());
auth.use(passport.session());

// configure passport
passport.use(new localStrategy(User.authenticate()));
// TODO: twitter strategy
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


/**********
 * Routes *
 **********/

// TODO: twitter oauth routes

module.exports = auth;
