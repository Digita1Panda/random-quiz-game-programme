// Declare variables
const timerCount = document.getElementById("time");

const mainScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start");

const questionsContainer = document.getElementById("questions");
const question = document.getElementById("question-title");
const choices = document.getElementById("choices");
const choicesText = Array.from(document.getElementsByClassName("choice-text"));
const displayOn = document.getElementsByClassName("hide");
const displayAnswer = document.getElementById("displayAnswer");

const endScreen = document.getElementById("end-screen");

let currentQuestion = {};
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let timeOnDisplay = 0;
let timer;

// Pressing start button will will hide the origin main text and populate questions and choices.
startBtn.addEventListener("click", function () {
  mainScreen.style.display = "none";

  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];

  getNewQuestion();
});

getNewQuestion = () => {
  if (questionsContainer.classList.contains("hide")) {
    questionsContainer.classList.remove("hide");
  }

  if (availableQuestions.length === 0) {
    questionsContainer.classList.add("hide");
    endScreen.classList.remove("hide");
    return;
  }

  //     return location.assign("/highscores.html");
  //   }
  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.textContent = currentQuestion.question;

  choicesText.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.textContent = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);
};

choicesText.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    selectedAnswer == currentQuestion.answer
      ? (displayAnswer.innerHTML = `______________________________<br><br>Correct!`)
      : (displayAnswer.innerHTML = `______________________________<br><br>Incorrect!`);
    getNewQuestion();
  });
});

startTimer = () => {
  timer = setInterval(function () {
    timeOnDisplay--;
    console.log(timer);
  });
};
