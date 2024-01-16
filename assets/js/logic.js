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
const finalScore = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitBtn = document.getElementById("submit");

const correctSound = new Audio("./assets/sfx/correct.wav");
const incorrectSound = new Audio("./assets/sfx/incorrect.wav");

let currentQuestion = {};
let timeLeft = 0;
let availableQuestions = [];
let timeOnDisplay = 0;
let timer;

// Pressing start button will will hide the origin main text and populate questions and choices.
startBtn.addEventListener("click", function () {
  // Setting the basic variables value
  mainScreen.style.display = "none";
  timeOnDisplay = 60;

  availableQuestions = [...questions];

  // Calling the functions to run on click of the start button
  getNewQuestion();
  startTimer();
});

// Function to call up a question
getNewQuestion = () => {
  // Unhiding the content of questions container
  if (questionsContainer.classList.contains("hide")) {
    questionsContainer.classList.remove("hide");
  }
  // This will will show the end screen and unhide the content if all the questions has been exhausted or when the timer is 0
  if (availableQuestions.length === 0 || timeOnDisplay === 0) {
    questionsContainer.classList.add("hide");
    endScreen.classList.remove("hide");

    // This will show the final score at the end page
    clearInterval(timer);
    finalScore.textContent = `${timeOnDisplay}`;
    return;
  }

  // Randomize the questions and displays it
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.textContent = currentQuestion.question;

  // Picks the choices currently in the current question and adds it onto the page
  choicesText.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.textContent = currentQuestion["choice" + number];
  });

  // After the question it will delete it out of the current index so it won't randomly be picked again.
  availableQuestions.splice(questionIndex, 1);
};

// Running through each choice
choicesText.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    // Marks the current choice whether is same as the correct answer
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    // If statement for correct answer
    if (selectedAnswer == currentQuestion.answer) {
      // Play correct sound
      correctSound.play();
    } else {
      // Play incorrect sound
      incorrectSound.play();
    }

    // If the selected answer is incorrect and if it is below 15 seconds it will set timer to 0 and jump to the end page. Else deduct -15 points and max timer will be 0 and will not go negative.
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

    // Display correct or incorrect depending on choice picked
    selectedAnswer == currentQuestion.answer
      ? (displayAnswer.innerHTML = `______________________________<br><br>Correct!`)
      : (displayAnswer.innerHTML = `______________________________<br><br>Incorrect!`);

    // Set time delay to show the correct or incorrect and then resets to next question
    setTimeout(() => {
      displayAnswer.textContent = "";
      getNewQuestion();
    }, 1000);
  });
});

// Timer function to display time and for it to countdown 1 every 1 seconds and it will clear time when it reaches 0
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
  finalScore.textContent = `${timeOnDisplay}`;
}

// Local storage function to store items by stringify converting it and then parsing it through to an array to be accessed.
const saveInitials = (initials) => {
  const scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.push({ initials, score: timeOnDisplay });
  scores.sort((a, b) => b - a); // Sort in descending order
  localStorage.setItem("scores", JSON.stringify(scores));
};

// Submit button on click to take user initials and save it by passing the local storage function. If user did not put anything in it will alert user.
submitBtn.addEventListener("click", () => {
  const initials = initialsInput.value.trim();

  if (initials !== "") {
    saveInitials(initials);
  } else {
    alert("Please enter your initials.");
  }

  // Open up the highscores html when button is clicked
  location.assign("./highscores.html");
});
