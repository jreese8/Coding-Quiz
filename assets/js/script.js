var containerOneEl = document.getElementById("container-one");
      
var containerTwoEl = document.getElementById("container-two");
     
var containerThreeEl = document.getElementById("container-three")

var ViewHighScoreEl = document.getElementById("view-high-scores")

var timerEl = document.querySelector("#timer");

var containerScoreEl = document.getElementById("score-banner")

var formInitials = document.getElementById("initials-form")

var containerHighScoresEl = document.getElementById("high-score-container")

var listHighScoreEl = document.getElementById("high-score-list")
      
var correctEl = document.getElementById("correct")
      
var incorrectEl = document.getElementById("incorrect")
      
var btnStartEl = document.querySelector("#start-game");

var btnGoBackEl = document.querySelector("#go-back")

var btnClearScoresEl = document.querySelector("#clear-high-scores")
    
var questionEl = document.getElementById("question")

var answerbuttonsEl = document.getElementById("answer-buttons")

var score = 0;

var timeleft;

var gameover
    timerEl.innerText = 0;

var HighScores = [];

var QuestionIndex = 0

  var questions = [

    { q: 'Commonly used data types do NOT include:', 
      a: '3. alerts', 
      choices: [{choice: '1. strings'}, {choice: '2. booleans'}, {choice: '3. alerts'}, {choice: '4. numbers'}]
    },

    { q: 'The condition in an if/else statement is enclosed with ____.', 
      a: '2. parenthesis', 
      choices: [{choice: '1. curly brackets'}, {choice: '2. parenthesis'}, {choice: '3. quotes'}, {choice: '4. commas'}]
    },

    { q: 'Arrays in Javascript can be used to store ________.', 
    a: '4. all of the above', 
    choices: [{choice: '1. strings'}, {choice: '2. booleans'}, {choice: '3. numbers'}, {choice: '4. all of the above'}]
    },

    { q: 'String values must be enclosed within _____ when being assigned to variables.', 
      a: '1. quotes', 
      choices: [{choice: '1. quotes'}, {choice: '2. commas'}, {choice: '3. curly brackets'}, {choice: '4. parenthesis'}]
    },
        
    { q: 'A very useful tool used during development and debugging for printing content to the debugger is:', 
      a: '4. console.log', 
      choices: [{choice: '1. JavaScript'}, {choice: '2. terminal/bash'}, {choice: '3. for loop'}, {choice: '4. console.log'}]    
    },
    {},
  ];
      
      //When Go back is clicked
    var renderStartPage = function () {
        containerHighScoresEl.classList.add("hide")
        containerHighScoresEl.classList.remove("show")
        containerOneEl.classList.remove("hide")
        containerOneEl.classList.add("show")
        containerScoreEl.removeChild(containerScoreEl.lastChild)
        QuestionIndex = 0
        gameover = ""
        timerEl.textContent = 0 
        score = 0

        if (correctEl.className = "show") {
            correctEl.classList.remove("show");
            correctEl.classList.add("hide")
        }
        if (incorrectEl.className = "show") {
            incorrectEl.classList.remove("show");
            incorrectEl.classList.add("hide");
        }
    }

    var setTime = function () {
        timeleft = 75;

    var timercheck = setInterval(function() {
        timerEl.innerText = timeleft;
        timeleft--

        if (gameover) {
            clearInterval(timercheck)
        }
       
        if (timeleft < 0) {
            showScore()
            timerEl.innerText = 0
            clearInterval(timercheck)
        }

        }, 1000)
    }

    var startGame = function() {
        containerOneEl.classList.add('hide');
        containerOneEl.classList.remove('show');
        containerTwoEl.classList.remove('hide');
        containerTwoEl.classList.add('show');

        setTime()
        setQuestion()
      }
    
    var setQuestion = function() {
        resetAnswers()
        displayQuestion(questions[QuestionIndex])
    }

    var resetAnswers = function() {
        while (answerbuttonsEl.firstChild) {
            answerbuttonsEl.removeChild(answerbuttonsEl.firstChild)
        };
    };

    var displayQuestion = function(index) {
        questionEl.innerText = index.q
        for (var i = 0; i < index.choices.length; i++) {
            var answerbutton = document.createElement('button')
            answerbutton.innerText = index.choices[i].choice
            answerbutton.classList.add('btn')
            answerbutton.classList.add('answerbtn')
            answerbutton.addEventListener("click", answerCheck)
            answerbuttonsEl.appendChild(answerbutton)
            }
        };

    var answerCorrect = function() {
        if (correctEl.className = "hide") {
            correctEl.classList.remove("hide")
            correctEl.classList.add("banner")
            incorrectEl.classList.remove("banner")
            incorrectEl.classList.add("hide")
            }
        }  

    var answerIncorrect = function() {
        if (incorrectEl.className = "hide") {
            incorrectEl.classList.remove("hide")
            incorrectEl.classList.add("banner")
            correctEl.classList.remove("banner")
            correctEl.classList.add("hide")
        }
    }
   
    var answerCheck = function(event) {
        var selectedanswer = event.target
            if (questions[QuestionIndex].a === selectedanswer.innerText){
                answerCorrect()
                score = score + 10
            }

            else {
              answerIncorrect()
              score = score - 1;
              timeleft = timeleft - 10;
          };

          QuestionIndex++
            if  (questions.length > QuestionIndex + 1) {
                setQuestion()
            }   
            else {
               gameover = "true";
               showScore();
                }
    }

    var showScore = function () {
        containerTwoEl.classList.add("hide");
        containerThreeEl.classList.remove("hide");
        containerThreeEl.classList.add("show");

        var scoreDisplay = document.createElement("p");
        scoreDisplay.innerText = ("Your final score is " + score + "!");
        containerScoreEl.appendChild(scoreDisplay);
    }       
    
    var createHighScore = function(event) { 
        event.preventDefault() 
        var initials = document.querySelector("#initials").value;
        if (!initials) {
          alert("Enter your intials!");
          return;
        }

      formInitials.reset();

      var HighScore = {
      initials: initials,
      score: score
      } 

    //Sorts scores from highest to lowest
      HighScores.push(HighScore);
      HighScores.sort((a, b) => {return b.score-a.score});

    //Ability to clear list of high scores
    while (listHighScoreEl.firstChild) {
       listHighScoreEl.removeChild(listHighScoreEl.firstChild)
    }
    
    for (var i = 0; i < HighScores.length; i++) {
      var highscoreEl = document.createElement("li");
      highscoreEl.ClassName = "high-score";
      highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
      listHighScoreEl.appendChild(highscoreEl);
    }

      saveHighScore();
      displayHighScores();

    }

    var saveHighScore = function () {
        localStorage.setItem("HighScores", JSON.stringify(HighScores))
            
    }

    var loadHighScore = function () {
        var LoadedHighScores = localStorage.getItem("HighScores")
            if (!LoadedHighScores) {
            return false;
        }

        LoadedHighScores = JSON.parse(LoadedHighScores);
        LoadedHighScores.sort((a, b) => {return b.score-a.score})
 

        for (var i = 0; i < LoadedHighScores.length; i++) {
            var highscoreEl = document.createElement("li");
            highscoreEl.ClassName = "high-score";
            highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
            listHighScoreEl.appendChild(highscoreEl);

            HighScores.push(LoadedHighScores[i]);      
        }
    }  

    var displayHighScores = function() {

        containerHighScoresEl.classList.remove("hide");
        containerHighScoresEl.classList.add("show");
        gameover = "true"

        if (containerOneEl.className = "show") {
            containerOneEl.classList.remove("show");
            containerOneEl.classList.add("hide");
            }
            
        if (containerTwoEl.className = "show") {
            containerTwoEl.classList.remove("show");
            containerTwoEl.classList.add("hide");
            }

        if (containerThreeEl.className = "show") {
            containerThreeEl.classList.remove("show");
            containerThreeEl.classList.add("hide");
            }

        if (correctEl.className = "show") {
            correctEl.classList.remove("show");
            correctEl.classList.add("hide");
        }

        if (incorrectEl.className = "show") {
            incorrectEl.classList.remove("show");
            incorrectEl.classList.add("hide");
            }
        }

        var clearScores = function () {
            HighScores = [];

            while (listHighScoreEl.firstChild) {
                   listHighScoreEl.removeChild(listHighScoreEl.firstChild);
        }

                localStorage.clear(HighScores);
        } 

        loadHighScore()
        
        btnStartEl.addEventListener("click", startGame)
      
        formInitials.addEventListener("submit", createHighScore)

        ViewHighScoreEl.addEventListener("click", displayHighScores)
      
        btnGoBackEl.addEventListener("click", renderStartPage)
    
        btnClearScoresEl.addEventListener("click", clearScores)