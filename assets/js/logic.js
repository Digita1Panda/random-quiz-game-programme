// Declare variables
const mainScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start");

const questionsContainer = document.getElementById("questions");
const question = document.getElementById("question-title");
const choices = document.getElementById("choices");
const choicesText = Array.from(document.getElementsByClassName("choice-text"));
const displayOn = document.getElementsByClassName("hide");
const displayAnswer = document.getElementById("displayAnswer");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// Pressing start button will will hide the origin main text and populate questions and choices.
startBtn.addEventListener("click", function () {
  mainScreen.style.display = "none";
  questionsContainer.style.display = "block";

  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];

  getNewQuestion();
});

getNewQuestion = () => {
  if (availableQuestions.length === 0) {
    return location.assign("/highscores.html");
  }
  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.textContent = currentQuestion.question;

  choicesText.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.textContent = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

choicesText.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    selectedAnswer == currentQuestion.answer
      ? (displayAnswer.innerHTML = `______________________________<br><br>Correct!`)
      : (displayAnswer.innerHTML = `______________________________<br><br>Incorrect!`);
    getNewQuestion();
  });
});
