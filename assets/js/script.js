const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const timer = document.getElementById("countdown");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
var timerEl = document.getElementById("countdown");
const scoreTracker = document.getElementById("score-tracker");
const scoreUpElement = document.getElementById("score-up");
const recordButton = document.getElementById("recordscore");
var timeLeft = 60;
let shuffledQuestions, currentQuestionIndex;
let scoreUp = 0;

const latestScore = localStorage.getItem("mostRecentScore");
const scoreLog = document.getElementById("latestscore");

scoreLog.innerText = latestScore;

const latestUser = localStorage.getItem("userName");
const userLog = document.getElementById("latestuser");

userLog.innerText = latestUser;

function hideScore() {
  if (latestScore === 0 && latestUser === 0) {
    userLog.classList.add("hide");
  }
}

startButton.addEventListener("click", startGame);
//nextButton.addEventListener("click", () => {
// currentQuestionIndex++;
//  setNextQuestion();
//});
function record(e) {
  recordButton.classList.remove("hide");
}
function countdown() {
  // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timeInterval);
      alert("Time is up!");
      resetState();
      record();
    }
  }, 1000);
}

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
  console.log("Iam in select answer");
  setStatusClass(document.body, correct);
  processResults(correct);

  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    //nextButton.classList.remove("hide");
    currentQuestionIndex++;
    setNextQuestion();
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "What is the largest big cat in the world?",
    answers: [
      { text: "Tiger", correct: true },
      { text: "Lion", correct: false },
      { text: "Panther", correct: false },
      { text: "Cheeta", correct: false },
    ],
  },
  {
    question: "How many legs does an octopus have?",
    answers: [
      { text: "8", correct: true },
      { text: "10", correct: false },
      { text: "4", correct: false },
      { text: "6", correct: false },
    ],
  },
  {
    question: "What is the largest country in the world?",
    answers: [
      { text: "China", correct: false },
      { text: "Russia", correct: true },
      { text: "Brazil", correct: false },
      { text: "America", correct: false },
    ],
  },
  {
    question: "Where would you find the River Thames?",
    answers: [
      { text: "Paris", correct: false },
      { text: "Rome", correct: false },
      { text: "Amsterdam", correct: false },
      { text: "London", correct: true },
    ],
  },
  {
    question: "Which planet is nearest to the Earth?",
    answers: [
      { text: "Jupiter", correct: false },
      { text: "Mars", correct: false },
      { text: "Venus", correct: true },
      { text: "Pluto", correct: false },
    ],
  },
  {
    question: "What is the proper term for your funny bone?",
    answers: [
      { text: "Ulna", correct: false },
      { text: "Pectoral girdle", correct: false },
      { text: "Tibia", correct: false },
      { text: "Humerus", correct: true },
    ],
  },
  {
    question: "Which dinosaur is thought to have the largest bite of them all?",
    answers: [
      { text: "Triceratops", correct: false },
      { text: "T-Rex", correct: true },
      { text: "Velociraptor", correct: false },
      { text: "Megalosaurus", correct: false },
    ],
  },
  {
    question:
      "What dinosaur themed book was turned into a blockbuster movie in 1993?",
    answers: [
      { text: "Monsters Inc", correct: false },
      { text: "Fantastic Beasts and Where to Find Them", correct: false },
      { text: "Jurrasic Park", correct: true },
      { text: "Monster's Ball", correct: false },
    ],
  },
  {
    question: "Enchiladas originated in which country?",
    answers: [
      { text: "Argentina", correct: false },
      { text: "Brazil", correct: false },
      { text: "Mexico", correct: true },
      { text: "Cuba", correct: false },
    ],
  },
  {
    question: "In French cooking, what does 'en Croute' mean?",
    answers: [
      { text: "In water", correct: false },
      { text: "To fry", correct: false },
      { text: "Meat", correct: false },
      { text: "In pastry", correct: true },
    ],
  },
  {
    question: "In The Jungle Book, what kind of animal is Baloo?",
    answers: [
      { text: "Panther", correct: false },
      { text: "Bear", correct: true },
      { text: "Orangutan", correct: false },
      { text: "Wolf", correct: false },
    ],
  },
  {
    question: "What is the name of Peter Pans pirate enemy?",
    answers: [
      { text: "Captain Obvious", correct: false },
      { text: "Captain America", correct: false },
      { text: "Captain Hook", correct: true },
      { text: "Captin Kirk", correct: false },
    ],
  },
  {
    question: "What Year Was Aston Villa Founded?",
    answers: [
      { text: "1912", correct: false },
      { text: "1900", correct: false },
      { text: "1874", correct: true },
      { text: "1875", correct: false },
    ],
  },
  {
    question: "What are baby goats called?",
    answers: [
      { text: "Babys", correct: false },
      { text: "Calfs", correct: false },
      { text: "Puppies", correct: false },
      { text: "Kids", correct: true },
    ],
  },
  {
    question: "What do camels store in their humps?",
    answers: [
      { text: "Water", correct: false },
      { text: "Fat", correct: true },
      { text: "Muscle", correct: false },
      { text: "Food", correct: false },
    ],
  },
  {
    question: "What is the only mammal which can fly?",
    answers: [
      { text: "Ostrich", correct: false },
      { text: "Penguin", correct: false },
      { text: "Bat", correct: true },
      { text: "Chicken", correct: false },
    ],
  },
  {
    question:
      "Which fast food company used the advertising slogan I'm Lovin' it?",
    answers: [
      { text: "KFC", correct: false },
      { text: "Burger King", correct: false },
      { text: "McDonalds", correct: true },
      { text: "Pizza Hut", correct: false },
    ],
  },
  {
    question:
      "What is the name of the lion in “The Lion, The Witch and the Wardrobe”?",
    answers: [
      { text: "Simba", correct: false },
      { text: "King", correct: false },
      { text: "Alex", correct: false },
      { text: "Aslan", correct: true },
    ],
  },
  {
    question: "What planet is known as the red planet?",
    answers: [
      { text: "Mercury", correct: false },
      { text: "Mars", correct: true },
      { text: "Saturn", correct: false },
      { text: "Earth", correct: false },
    ],
  },
  {
    question: "Botany is the study of what?",
    answers: [
      { text: "Space", correct: false },
      { text: "The Ocean", correct: false },
      { text: "Plants", correct: true },
      { text: "Animals", correct: false },
    ],
  },
  {
    question: "Who was elected President of the United States in 2017?",
    answers: [
      { text: "Barack Obama", correct: false },
      { text: "Bill Clinton", correct: false },
      { text: "Donald Trump", correct: true },
      { text: "George Bush", correct: false },
    ],
  },
  {
    question: "What is the national animal of Pakistan?",
    answers: [
      { text: "Peacock", correct: false },
      { text: "lion", correct: false },
      { text: "Tiger", correct: false },
      { text: "Markhor", correct: true },
    ],
  },
  {
    question: "A la Crecy is a French dish made of what?",
    answers: [
      { text: "Potatoes", correct: false },
      { text: "Carrots", correct: true },
      { text: "Mince Meat", correct: false },
      { text: "Apples", correct: false },
    ],
  },
  {
    question: "Saudi Arabia is the biggest producer of?",
    answers: [
      { text: "Coffee", correct: false },
      { text: "Coal", correct: false },
      { text: "Oil", correct: true },
      { text: "Weapons", correct: false },
    ],
  },
  {
    question: "How many colors in the Rainbow?",
    answers: [
      { text: "5", correct: false },
      { text: "6", correct: false },
      { text: "7", correct: true },
      { text: "8", correct: false },
    ],
  },
  {
    question:
      "Which religion believes in One God and Last Prophet Muhammad (PBUH)?",
    answers: [
      { text: "Christianity", correct: false },
      { text: "Buddhism", correct: false },
      { text: "hinduism", correct: false },
      { text: "Islam", correct: true },
    ],
  },
  {
    question:
      "Which religion has a God specified for each Rain, Money, Children, and Love?",
    answers: [
      { text: "Christianity", correct: false },
      { text: "Buddhism", correct: false },
      { text: "hinduism", correct: true },
      { text: "Islam", correct: false },
    ],
  },
  {
    question: "What is the currency of Qatar?",
    answers: [
      { text: "Pound", correct: false },
      { text: "Euro", correct: false },
      { text: "Riyal", correct: true },
      { text: "Dollar", correct: false },
    ],
  },
];

function processResults(correct) {
  if (correct) {
    document.body.classList.add("correct");
  } else {
    document.body.classList.add("wrong");

    timeLeft -= 10;
    if (timeLeft <= 0) {
      timeLeft = 0;
      timer.classList.add("hide");
    }
    timerEl.textContent = timeLeft;
  }

  function timer() {
    if (timerEl <= 20) {
      //timer.classList.add("warning");
      document.getElementById("countdown").style.color = "red";
    }
    // timerEl.textContent = timeLeft;
  }

  scoreUp = parseInt(scoreUpElement.textContent, 10) || 0;

  if (correct) {
    scoreUp += 1;
  }
  scoreUpElement.textContent = scoreUp;

  localStorage.setItem("mostRecentScore", scoreUp);
}

function checkStorage() {
  if (localStorage.getItem("userName") === null) {
    console.log(localStorage.getItem("userName"));
    document.getElementById("scores").style.display = "none";
  }
  // if localstorage is null or empty
  //target the scores div and make .style.display = none
  //
}
checkStorage();
