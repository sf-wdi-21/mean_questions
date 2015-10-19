var mongoose = require('mongoose'),
    db = require('./../models'),
    Question = db.Question,
    Answer = db.Answer;

// create answer embedded in question
module.exports.create = function (req, res) {
  // set the value of the question id
  var questionId = req.params.questionId;

  // store new answer in memory with data from request body
  var newAnswer = new Answer(req.body);

  // find question in db by id and add new answer
  Question.findOne({_id: questionId}, function (err, foundQuestion) {
    foundQuestion.answers.push(newAnswer);
    foundQuestion.save(function (err, savedQuestion) {
      res.json(newAnswer);
    });
  });
};

// update answer embedded in question
module.exports.update = function (req, res) {
  // set the value of the question and answer ids
  var questionId = req.params.questionId;
  var answerId = req.params.id;

  // find question in db by id
  Question.findOne({_id: questionId}, function (err, foundQuestion) {
    // find answer embedded in question
    var foundAnswer = foundQuestion.answers.id(answerId);
    // update answer text with data from request body
    foundAnswer.text = req.body.text;
    foundQuestion.save(function (err, savedQuestion) {
      res.json(foundAnswer);
    });
  });
};

// delete answer embedded in question
module.exports.destroy = function (req, res) {
  // set the value of the question and answer ids
  var questionId = req.params.questionId;
  var answerId = req.params.id;

  // find question in db by id
  Question.findOne({_id: questionId}, function (err, foundQuestion) {
    // find answer embedded in question
    var foundAnswer = foundQuestion.answers.id(answerId);
    // remove answer
    foundAnswer.remove();
    foundQuestion.save(function (err, savedQuestion) {
      res.json(foundAnswer);
    });
  });
};
