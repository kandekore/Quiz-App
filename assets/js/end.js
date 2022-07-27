const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const mostRecentScore = localStorage.getItem("mostRecentScore");

const finalScore = document.getElementById("finalScore");

finalScore.innerText = mostRecentScore;

username.addEventListener("input", () => {
  console.log(username.value)
  saveScoreBtn.disabled = !username.value;
  localStorage.setItem("userName", username.value);
});



saveHighScore = (e) => {
  console.log("savehigh score")
 e.preventDefault();
};