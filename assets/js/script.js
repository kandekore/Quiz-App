const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const timer = document.getElementById("countdown")
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
//const keepScore = document.querySelector("#userscore");
var timerEl = document.getElementById("countdown");
const scoreTracker = document.getElementById("score-tracker");
const scoreUpElement = document.getElementById("score-up");
const recordButton = document.getElementById("recordscore");
var timeLeft = 15;
let shuffledQuestions, currentQuestionIndex;
let scoreUp = 0;

//const mostRecentScore = localStorage.getItem("mostRecentScore");

const latestScore = localStorage.getItem("mostRecentScore");
const scoreLog = document.getElementById("latestscore");

scoreLog.innerText = latestScore;

const latestUser = localStorage.getItem("userName");
const userLog = document.getElementById("latestuser");

userLog.innerText = latestUser;

function hideScore (){
  if (latestScore === 0 && latestUser === 0){
    userLog.classList.add("hide");

  }
}

console.log(latestScore);
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
function record(e) {
  recordButton.classList.remove("hide");
}
function countdown() {
 

  // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0 ) {
      clearInterval(timeInterval);
      alert("Time is up!");
      resetState();
      record();
    }
 
  }, 1000);
}





/*var userScore = 0;
var point = 1;
function score() {
  score = userScore + point;

  return score;
}*/
//keepScore.textContent == userScore;
function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
  countdown();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  console.log("Iam in select answer")
  setStatusClass(document.body, correct);
  processResults(correct);
  //setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

//function subtractTime(event) {
// timerEl.textContent = timeLeft.subtractTime - 10000;
//}

//function addDay() {
//countDownDate.setDate(countDownDate.getDate()+1)
// update();
//}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "What year were the club founded?",
    answers: [
      { text: "1874", correct: true },
      { text: "22", correct: false },
    ],
  },
  {
    question: "Who has made the most all-time appearances for Aston Villa?",
    answers: [
      { text: "Charlie Aitken", correct: true },
      { text: "Traversy Media", correct: false },
      { text: "Dev Ed", correct: false },
      { text: "Fun Fun Function", correct: false },
    ],
  },
  {
    question:
      "Billy Walker is Aston Villa's top goalscorer but how many goals did he score for the club?",
    answers: [
      { text: "Kinda", correct: false },
      { text: "244", correct: true },
      { text: "Um no", correct: false },
      { text: "IDK", correct: false },
    ],
  },
  {
    question: "What year did Villa Park open?",
    answers: [
      { text: "6", correct: false },
      { text: "1897", correct: true },
    ],
  },
];

function processResults(correct) {
  //if (!isCorrect) {
  //  return;
  //}
  if (correct) {
    document.body.classList.add("correct");
    /*userScore += 1;

    console.log(userScore);
    console.log(score);*/
  } else {
    document.body.classList.add("wrong");
    
      timeLeft -= 25;
      if (timeLeft <= 0) {
        timeLeft = 0;
        timer.classList.add("hide");
      }
    timerEl.textContent = timeLeft;
    
    
  }

  function timer () {
    
  
    if (timeLeft <= 10) {
        
    timer.classList.add("warning");
    }
       timerEl.textContent = timeLeft;
    };
  
  
 
  scoreUp = parseInt(scoreUpElement.textContent, 10) || 0;

  if (correct) {
    scoreUp += 1;
  }
  scoreUpElement.textContent = scoreUp ;
  
  localStorage.setItem("mostRecentScore", scoreUp );
}

console.log["scoreTracker"];
console.log["scoreUpElement"];
