var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AnswerSchema = new Schema({
  text: {
    type: String,
    required: true
  }
});

var Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;
