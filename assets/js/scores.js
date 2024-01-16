document.addEventListener("DOMContentLoaded", function () {
  // Get the element where to display the high scores
  const highscoresList = document.getElementById("highscores");
  const clearBtn = document.getElementById("clear");
  // Retrieve scores from local storage
  const scores = JSON.parse(localStorage.getItem("scores")) || [];

  // Sort scores in descending order
  scores.sort((a, b) => b.score - a.score);

  // Display each score in the list
  scores.forEach((score) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${score.initials}: ${score.score}`;
    highscoresList.appendChild(listItem);

    // Clears the local storage and removes the list items on the page
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem("scores");
      while (highscoresList.firstChild) {
        highscoresList.removeChild(highscoresList.firstChild);
      }
    });
  });
});
