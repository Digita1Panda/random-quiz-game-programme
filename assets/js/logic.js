// Declare variables
const questionsContainer = document.getElementById("questions");
const question = document.getElementById("question-title");
const choices = document.getElementById("choices");
const choicesText = Array.from(document.getElementsByClassName("choices"));
const startBtn = document.getElementById("start");

// Pressing start button will will hide the origin main text and populate questions and choices.
