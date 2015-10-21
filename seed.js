var db = require("./models");

var new_questions = [
  {
    text: "What method would you use to add an answer to this question?"
  },
  {
    text: "Can u modify tihs to fix teh typoes?",
    answers: [{text: "try using PUT!"}]
  }
]

// clear the database of all Questions
db.Question.remove({}, function(err, foods){
  console.log("Deleting all questions...");

  db.Question.create(new_questions, function (err, questions) {

    if (err) {
      console.log(err);
    } else {
      console.log("Created", questions.length, "questions")
    }

    process.exit()

  });

});

