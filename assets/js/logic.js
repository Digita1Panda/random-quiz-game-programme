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
  timeOnDisplay = 60;

  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];

  getNewQuestion();
  startTimer();
});

getNewQuestion = () => {
  if (questionsContainer.classList.contains("hide")) {
    questionsContainer.classList.remove("hide");
  }

  if (availableQuestions.length === 0 || timeOnDisplay === 0) {
    questionsContainer.classList.add("hide");
    endScreen.classList.remove("hide");
    return;
  }

  //     return location.assign("/highscores.html");

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

    // if (selectedAnswer != currentQuestion.answer) {
    //   timeOnDisplay -= 15;
    //   timeOnDisplay = Math.max(timeOnDisplay, 0);
    if (selectedAnswer != currentQuestion.answer) {
      if (timeOnDisplay < 15) {
        timeOnDisplay = 0;
        clearInterval(timer);
        // Go to the end page
        goToEndPage();
      } else {
        timeOnDisplay -= 15;
        timeOnDisplay = Math.max(timeOnDisplay, 0);
      }
    }

    selectedAnswer == currentQuestion.answer
      ? (displayAnswer.innerHTML = `______________________________<br><br>Correct!`)
      : (displayAnswer.innerHTML = `______________________________<br><br>Incorrect!`);

    setTimeout(() => {
      displayAnswer.textContent = "";
      getNewQuestion();
    }, 1000);
  });
});

startTimer = () => {
  timerCount.textContent = timeOnDisplay;

  timer = setInterval(function () {
    if (timeOnDisplay > 0) {
      timeOnDisplay--;
      timerCount.textContent = timeOnDisplay;
    }

    if (timeOnDisplay === 0) {
      clearInterval(timer);
    }
  }, 1000);
};

// Function to go to the end page
function goToEndPage() {
  questionsContainer.classList.add("hide");
  endScreen.classList.remove("hide");
  // Add code to display the score and save initials
}
