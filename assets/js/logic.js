// Declare variables
const mainScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start");

const questionsContainer = document.getElementById("questions");
const question = document.getElementById("question-title");
const choices = document.getElementById("choices");
const choicesText = Array.from(document.getElementsByClassName("choices"));

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;

// Pressing start button will will hide the origin main text and populate questions and choices.
startBtn.addEventListener("click", function () {
  mainScreen.style.display = "none";
});
