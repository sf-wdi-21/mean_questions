var db = require("./models");

var new_questions = [
  {text: "Why is the sky blue?"},
  {text: "What is a question mark?"}
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

