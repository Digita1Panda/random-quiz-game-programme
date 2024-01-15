// Declare variables
const mainScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start");

const questionsContainer = document.getElementById("questions");
const question = document.getElementById("question-title");
const choices = document.getElementById("choices");
const choicesText = Array.from(document.getElementsByClassName("choice-text"));
const displayOn = document.getElementsByClassName("hide");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Commonly used data types DO NOT include:",
    choice1: "strings",
    choice2: "booleans",
    choice3: "alerts",
    choice4: "numbers",
    answer: 3,
  },
  {
    question:
      "The condition of in an if/else statement is enclosed within _____.",
    choice1: "quotes",
    choice2: "curly brackets",
    choice3: "parentheses",
    choice4: "square brackets",
    answer: 2,
  },
  {
    question: "Arrays in JavaScript can be used to store _____.",
    choice1: "numbers and strings",
    choice2: "other arrays",
    choice3: "booleans",
    choice4: "all of the above",
    answer: 4,
  },
  {
    question:
      "String values must be enclosed within _____ when being being assigned to variables.",
    choice1: "commas",
    choice2: "curly brackets",
    choice3: "quotes",
    choice4: "parentheses",
    answer: 3,
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the de debugger is:",
    choice1: "JavaScript",
    choice2: "terminal/bash",
    choice3: "for loops",
    choice4: "console.log",
    answer: 4,
  },
];

// Pressing start button will will hide the origin main text and populate questions and choices.
startBtn.addEventListener("click", function () {
  mainScreen.style.display = "none";
  questionsContainer.style.display = "block";

  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  console.log(availableQuestions);
  getNewQuestion();
});

getNewQuestion = () => {
  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.textContent = currentQuestion.question;

  choicesText.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.textContent = currentQuestion["choice" + number];
  });
  console.log(choices);
  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};
