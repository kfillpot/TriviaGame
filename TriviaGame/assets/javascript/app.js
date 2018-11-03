var form = $('#quiz-form');

//The code below will represent the buttons for this quiz
$(document).on('click', '#startButton', function() {
  trivia.start();
});

$(document).on('click', '#doneButton', function() {
  trivia.done();
});

//The code below will represent the questions, answers, and correct choices
var questions= [
    {   
        question:"1. Which of these races is not real?",
        answers:["Wood Elf","Dark Elf","Shadow Elf","Grey Elf"],
        correctChoice: "Shadow Elf"
    },
    {
        question:"2. What is Epic Level?",
        answers:["15+", "18+", "19+", "20+"],
        correctChoice: "20+"
    },
    {
        question: "3. A paladin must be ______________.",
        answers: ["Lawful Good", "Lawful Evil", "Chaotic Good", "Choatic Evil"],
        correctChoice: "Lawful Good"
    },
    {
        question: "4. An Arcane Archer must be ______________.",
        answers: ["Human", "Elven", "Orcish", "No Restrictions"],
        correctChoice: "Elven"
    },
    {
        question: "5. What dragon is Chaotic Good?",
        answers:  ["Silver", "Gold", "White", "Blue"], 
        correctChoice: "Silver"
    }
];

//The code below will represent the variables that will be used throughout the quiz. It represents the correct, incorrect answers as well as the timer
var trivia = {
  correct:0,
  incorrect:0,
  counter:30,
  timer: function(){
    trivia.counter--;
    $('#counter-number').html(trivia.counter);

    // Once the timer counts down to one, the user will receive a pop up letting them know and will move them to the results page
    if (trivia.counter === 0){
      alert("You're out of time!");
      trivia.done();
    }
  },
  start: function() {
    timer = setInterval(trivia.timer, 1000);

    $('#subcontainer').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
    $('#startButton').remove();

    //The code below appends the questions and answer options to the second screen the user will see
    for (var i = 0; i < questions.length; i++) {
      form.append('<h2>' + questions[i].question + '</h2>');
      for (var j = 0; j < questions[i].answers.length; j++) {
        form.append('<h3><input type="radio" name="question' + '-' + i + '" value="' + questions[i].answers[j] + '">' + questions[i].answers[j]);
      }
    }

    form.append('<button id="doneButton">Done</button>');
  },
  done: function() {

    //The code below will log the user's selection "This" would represent the user answer
    $.each($("input[name='question-0']:checked"), function() {
      if ($(this).val() == questions[0].correctChoice) {
        trivia.correct++;
      } else {
        trivia.incorrect++;
      }
    });
    $.each($("input[name='question-1']:checked"), function() {
        if ($(this).val() == questions[1].correctChoice) {
        trivia.correct++;
      } else {
        trivia.incorrect++;
      }
    });
    $.each($("input[name='question-2']:checked"), function() {
      if ($(this).val() == questions[2].correctChoice) {
        trivia.correct++;
      } else {
        trivia.incorrect++;
      }
    });
    $.each($("input[name='question-3']:checked"), function() {
      if ($(this).val() == questions[3].correctChoice) {
        trivia.correct++;
      } else {
        trivia.incorrect++;
      }
    });
    $.each($("input[name='question-4']:checked"), function() {
      if ($(this).val() == questions[4].correctChoice) {
        trivia.correct++;
      } else {
        trivia.incorrect++;
      }
    });
 
  //The code below will move to the results page and reflect the score for correct, incorrect, and unanswered code

    this.totals();
  },
    totals: function() {

    clearInterval(timer);

    $('<h2>#subcontainer</h2>').remove();
    form.html("<h2>Let's See How You Did!</h2>");
    form.append('<h3>Correct Answers: ' + trivia.correct + '</h3>');
    form.append('<h3>Incorrect Answers: ' + trivia.incorrect + '</h3>');
    form.append('<h3>Unanswered: ' + (questions.length - (trivia.incorrect + trivia.correct)) + '</h3>');
  }

};