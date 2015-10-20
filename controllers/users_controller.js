var express = require('express'),
    passport = require('passport'),
    User = require('./../models').User;

// signup, users#create
module.exports.register = function (req, res) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
    if (err) {
      return res.status(500).json({err: err});
    }

    // Remove sensitive data before login
    user.hash = undefined;
    user.salt = undefined;

    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      res.status(200).json({
                              status: 'Registration successful!',
                              data: user
                          });
    });
  });
};

// signin, sessions#create
module.exports.login = function (req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return res.status(500).json({err: err});
    }
    if (!user) {
      return res.status(401).json({err: info});
    }

    // Remove sensitive data before login
    user.hash = undefined;
    user.salt = undefined;

    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({err: 'Could not log in user'});
      }
      res.status(200).json({
                              status: 'Login successful!',
                              data: user
                          });;
    });
  })(req, res, next);
};

// signout, sessions#destroy
module.exports.logout = function (req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'});
};

// Authorize User
module.exports.requireUser = function (req, res, next) {
  if (req.user && req.user._id){
    return next();
  }

  res.status(401).json({err: "Login Required"})
};
