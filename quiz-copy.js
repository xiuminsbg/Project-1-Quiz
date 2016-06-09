/* global $ */
function Question (ask, choices, correctAnswerIndex) {
  this.ask = ask;
  this.choices = choices;
  this.correctAnswerIndex = correctAnswerIndex;
}
var question1 = new Question('Inside which HTML element do we put the JavaScript?', ['<javascript>', '<scripting>', '<js>', '<script>'], 3);
var question2 = new Question('Where is the correct place to insert a JavaScript?', ['The <body> section', 'Both the <head> section and the <body> section are correct', 'The <head> section'], 1);
var question3 = new Question('What is the correct syntax for referring to an external script called "xxx.js"?', ['<script href="xxx.js">', '<script name="xxx.js">', '<script src="xxx.js">'], 2);
var question4 = new Question('The external JavaScript file must contain the <script> tag.', ['False', 'True'], 0);
var question5 = new Question('How do you write "Hello World" in an alert box?', ['msgBox("Hello World");', 'alert("Hello World");', 'alertBox("Hello World");', 'msg("Hello World");'], 1);
var question6 = new Question('How do you create a function in JavaScript?', ['function:myFunction()', 'function myFunction()', 'function = myFunction()'], 1);
var question7 = new Question('How do you call a function named "myFunction"?', ['myFunction()', 'call function myFunction()', 'call myFunction()'], 0);
var question8 = new Question('How to write an IF statement in JavaScript?', ['if i == 5 then', 'if i = 5 then', 'if (i == 5)', 'if i = 5'], 2);
var question9 = new Question('How to write an IF statement for executing some code if "i" is NOT equal to 5?', ['if (i <> 5)', 'if i <> 5', 'if (i != 5)', 'if i =! 5 then'], 2);
var question10 = new Question('How does a WHILE loop start?', ['while i = 1 to 10', 'while (i <= 10)', 'while (i <= 10; i++)'], 1);
var quiz = {
  questionsList: [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10],
  currentQuestion: 0,
  isGameOver: false,
  player1Points: 0,
  player2Points: 0
};
// console.log(quiz.questionsList)
function numberOfQuestions () {
    // It should return an integer that is the number of questions in a game
  return (quiz.questionsList.length);
}

function currentQuestion () {
  // It should return an integer that is the zero-based index of the current question in the quiz
  return (quiz.currentQuestion);
}

function correctAnswer () {
    // It should return an integer that is the zero-based index the correct answer for the currrent question
  return (quiz.questionsList[quiz.currentQuestion].correctAnswerIndex);
}

function numberOfAnswers () {
  // It should return an integer that is the number of choices for the current question
  return (quiz.questionsList[quiz.currentQuestion].choices.length);
}
function playTurn (choice) {
  // It should take a single integer, which specifies which choice the current player wants to make. It should return a boolean true/false if the answer is correct.
  if (quiz.isGameOver) {
    return false;
  }
  var correct = false;
  if (choice === correctAnswer()) {
    correct = true;
    // console.log(quiz.questionsList[quiz.currentQuestion].correctAnswerIndex);
    if (quiz.currentQuestion % 2 === 1) {
      quiz.player2Points++;
    } else {
      quiz.player1Points++;
    }
  }
  ++quiz.currentQuestion;
  if (quiz.currentQuestion === numberOfQuestions()) {
    quiz.isGameOver = true;
  }
  return correct;
}
function isGameOver () {
  // It should return a true or false if the quiz is over.
  return quiz.isGameOver;
}

function whoWon () {
  // It should return 0 if the game is not yet finished. Else it should return either 1 or 2 depending on which player won. It should return 3 if the game is a draw.
  if (!quiz.isGameOver) return 0;
  if (quiz.player1Points > quiz.player2Points) return 1;
  if (quiz.player1Points < quiz.player2Points) return 2;
  return 3;
}

function restart () {
  // It should restart the game so it can be played again.
  quiz.currentQuestion = 0;
  quiz.isGameOver = false;
  quiz.player1Points = 0;
  quiz.player2Points = 0;
}
function displayQuestion () {
  if (isGameOver()) {
    $('#player1Score').text('Score: ' + quiz.player1Points);
    $('#player2Score').text('Score: ' + quiz.player2Points);
    // $('h2').text('Game Over! Winner is ' + whoWon());
    if (whoWon() === 3) {
      $('h2').text("Game Over! It's a Tie!");
    } else {
      $('h2').text('Game Over! Winner is ' + whoWon());
    }
  } else {
    // Update player scores
    $('#player1Score').text('Score: ' + quiz.player1Points);
    $('#player2Score').text('Score: ' + quiz.player2Points);
    $('h2').text('Question ' + (quiz.currentQuestion + 1) + ' of 10');
    var paragraph = $('<p></p>');
    paragraph.text(quiz.questionsList[quiz.currentQuestion].ask);
    $('#theQuestion').append(paragraph);
    for (var i = 0; i < quiz.questionsList[quiz.currentQuestion].choices.length; i++) {
      $('#choices').append('<button class="buttons"></button>');
      $('button').eq(i).text(quiz.questionsList[quiz.currentQuestion].choices[i]);
    }
  }

  $('button').click(function () {
    console.log('button clicked');
    if (isGameOver()) {
      // console.log('game over');
      restart();
    } else {
      playTurn($(this).index());
      // console.log('haha' + $(this).index());
      $('#choices').children().remove();
      $('#theQuestion').children().remove();
      // console.log('playTurn running');
      // Update player scores
      // $('#player1Score').text('Score: ' + quiz.player1Points);
      // $('#player2Score').text('Score: ' + quiz.player2Points);
      // console.log('player1' + quiz.player1Points);
      // console.log('player2' + quiz.player2Points);
      // console.log(quiz.player1Points);
    }
    displayQuestion();
  });
}
displayQuestion();
$('#reset').click(function () {
  restart();
  location.reload();
});

// $(function (){
//   $('button').click(function () {
//     console.log('button clicked');
//     if (isGameOver()) {
//       console.log('game over');
//       restart();
//     } else {
//       playTurn($(this).index());
//       console.log('playTurn running');
//     }
//     displayQuestion();
//   });
//   displayQuestion();
// });
