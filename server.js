// require express and other modules
var express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    hash = require('bcrypt-nodejs'),
    path = require('path'),
    ejs = require('ejs'),
    passport = require('passport'),
    localStrategy = require('passport-local' ).Strategy;

// create instance of express
var app = express();

// set templating engine
app.set('view engine', 'ejs');

// user schema/model
var User = require('./models').User;

// require routes
var api = require('./api');

/**************
 * MiddleWare *
 **************/
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // parse forms
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'so many questions',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public'))); // angular application

// configure passport
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


/**********
 * Routes *
 **********/

app.use(api);

app.get(["/", "*"], function(req, res){
  res.send(
     res.render('application.html.ejs', {user: req.user})
  )
});

/**********
 * Errors *
 **********/

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    message: err.message,
    error: {}
  }));
});

/**********
 * Server *
 **********/

app.listen(3000, function() {
  console.log('server started on localhost:3000');
});
