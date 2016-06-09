/* global $ */
$(document).ready(function () {
  var questionsList = [{
    theQuestion: 'What will the following code return: Boolean(10>9)',
    choices: ['false', 'true', 'NaN'],
    correctAnswer: 'true'
  }, {
    theQuestion: 'Where is the correct place to insert a JavaScript?',
    choices: ['The <body> section', 'Both the <head> section and the <body> section are correct', 'The <head> section'],
    correctAnswer: 'Both the <head> section and the <body> section are correct'
  }, {
    theQuestion: 'What is the correct syntax for referring to an external script called "xxx.js"?',
    choices: ['<script href="xxx.js">', '<script name="xxx.js">', '<script src="xxx.js">'],
    correctAnswer: '<script src="xxx.js">'
  }, {
    theQuestion: 'The external JavaScript file must contain the <script> tag.',
    choices: ['False', 'True'],
    correctAnswer: 'False'
  }, {
    theQuestion: 'How do you write "Hello World" in an alert box?',
    choices: ['msgBox("Hello World");', 'alert("Hello World");', 'alertBox("Hello World");', 'msg("Hello World");'],
    correctAnswer: 'alert("Hello World");'
  }, {
    theQuestion: 'How do you create a function in JavaScript?',
    choices: ['function:myFunction()', 'function myFunction()', 'function = myFunction()'],
    correctAnswer: 'function myFunction()'
  }, {
    theQuestion: 'How do you call a function named "myFunction"?',
    choices: ['myFunction()', 'call function myFunction()', 'call myFunction()'],
    correctAnswer: 'myFunction()'
  }, {
    theQuestion: 'How to write an IF statement in JavaScript?',
    choices: ['if i == 5 then', 'if i = 5 then', 'if (i == 5)', 'if i = 5'],
    correctAnswer: 'if (i == 5)'
  }, {
    theQuestion: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
    choices: ['if (i <> 5)', 'if i <> 5', 'if (i != 5)', 'if i =! 5 then'],
    correctAnswer: 'if (i != 5)'
  }, {
    theQuestion: 'How does a WHILE loop start?',
    choices: ['while i = 1 to 10', 'while (i <= 10)', 'while (i <= 10; i++)'],
    correctAnswer: 'while (i <= 10)'
  }];

  console.log(questionsList.length);
  var currentPlayer = null;
  var player1 = true;
  var player2 = true;
  var currentQuestion = 0;
  var score = 0;
  var playerAnswer = 0;
  var correctIndex;
  // Display Current Question & Choices
  function displayQuestion () {
    $('h2').text('Question ' + (currentQuestion + 1) + ' of 10');
    var paragraph = $('<p></p>');
    paragraph.text(questionsList[currentQuestion].theQuestion);
    $('#theQuestion').append(paragraph);
    // '<p>' + questionsList[currentQuestion].theQuestion + '</p>');
    // Create radio buttons for choices section
    var mcChoices = questionsList[currentQuestion].choices;
    var radioOfChoices = '';
    var mcChoicesLength = mcChoices.length;
    for (var i = 0; i < mcChoicesLength; i++) {
      radioOfChoices += '<input type="radio" name="quiz' + currentQuestion + '" id="option' + (i + 1) + '" value="' + mcChoices[i] + '">' + '<label for="option' + (i + 1) + '">' + mcChoices[i] + '</label><br>';
      console.log(radioOfChoices);
    }
    $('#choices').html(radioOfChoices);
  }
  // Choose which player want to answer the current question and disallow opponent to press the button
  function playTurn () {
    $('#player1').on('click', function () {
      currentPlayer = player1;
      player2 = false;
      $('#player2').off('click');
      console.log('Player1');
    });
    $('#player2').on('click', function () {
      currentPlayer = player2;
      player1 = false;
      $('#player1').off('click');
      console.log('Player2');
    });
  }
  function chooseAnswer () {
    // Select answer (which radio button chosen)
    var radioList = document.getElementsByName('quiz' + currentQuestion);
    for (var i = 0; i < radioList.length; i++) {
      if (radioList[i].checked) {
        playerAnswer = radioList[i].value;
        console.log(playerAnswer);
      }
      // check if answer is correct
      var labelStyle = document.getElementByTagName('label'+correctIndex).style;
      labelStyle.fontWeight = 'bold';
      if (radioList[i].value === questionsList[currentQuestion].correctAnswer) {
        correctIndex = i;
        labelStyle.color = 'green';
      } else {
        labelStyle.color = 'red';
      }
    }
  }
  // submit answer
  function submit () {
    console.log('submit');
    if (currentPlayer === player1) {
      evaluateAnswer();
      document.getElementById('#player1Score').innerHTML = calcScore();
    }
  }

  // check if answer is correct
  // function evaluateAnswer () {
  //   var labelStyle = document.getElementByTagName('label')[correctIndex].style;
  //   labelStyle.fontWeight = 'bold';
  //   if (playerAnswer === questionsList[currentQuestion].correctAnswer) {
  //     labelStyle.color = 'green';
  //     score++;
  //   } else {
  //     labelStyle.color = 'red';
  //   }
  // }
  // Display score
  function calcScore () {
    if (evaluateAnswer === true) {
      score++;
    }
  }
  // Next button
  function next () {
    if (currentQuestion < questionsList.length - 1) {
      currentQuestion++;
      // displayQuestion();
      console.log('next is clicked');
    } else {
      showFinalResults();
    }
  }
  // Restart
  function restart () {
    console.log('restart');
  }
  displayQuestion();
  playTurn();
  chooseAnswer();
  $('#submit').click(submit);
  $('#next').click(next);
});
