var mongoose = require('mongoose'),
    db = require('./../models'),
    Question = db.Question,
    Answer = db.Answer;

// send back all questions
module.exports.index = function (req, res) {
  Question.find({})
          .populate('questions')
          .exec(function (err, questions) {
    res.json(questions);
  });
}

// create new question
module.exports.create = function (req, res) {
  // create new question with data from the body of the request (`req.body`)
  // body should contain the question text itself
  var newQuestion = new Question(req.body);

  // save new question
  newQuestion.save(function (err, savedQuestion) {
    if (err) {
      res.status(422).send(err.errors.text.message);
    } else {
      res.json(savedQuestion);
    }
  });
}

// get one question
module.exports.show = function (req, res) {
  // set the value of the id
  var targetId = req.params.id;

  // find question in db by id
  Question.findOne({_id: targetId})
          .populate('questions')
          .exec(function (err, foundQuestion) {
    res.json(foundQuestion);
  });
}


// update question by replacing old question in db
module.exports.update = function (req, res) {
  // set the value of the id
  var targetId = req.params.id;

  // find question in db by id
  Question.findOne({_id: targetId}, function (err, foundQuestion) {
    // update the question's text
    foundQuestion.text = req.body.text;

    // save updated question in db
    foundQuestion.save(function (err, savedQuestion) {
      if (err) {
        res.status(422).send(err.errors.text.message);
      } else {
        res.json(savedQuestion);
      }
    });
  });
}


// delete the question
module.exports.destroy = function (req, res) {
  // set the value of the id
  var targetId = req.params.id;

  // find question in db by id and remove
  Question.findOneAndRemove({_id: targetId}, function (err, deletedQuestion) {
    res.json(deletedQuestion);
  });
}
