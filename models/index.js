var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/ask_anythingz');

module.exports = {
  Question: require('./question'),
  Answer: require('./answer'),
  User: require('./user')
};
