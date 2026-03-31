let currentQuestion = 0;
let score = 0;
let hearts = 3;
let wrongQuestions = [];

function loadQuestion() {
  let q = questions[currentQuestion];

  document.getElementById("question").innerText = q.question;

  q.options.forEach((opt, i) => {
    document.getElementById("opt" + i).innerText = opt;
  });

  document.getElementById("hearts").innerText = "❤️".repeat(hearts);
  document.getElementById("score").innerText = "Score: " + score;
}

function checkAnswer(selected) {
  let correct = questions[currentQuestion].answer;

  if (selected === correct) {
    score++;
  } else {
    hearts--;
    wrongQuestions.push(questions[currentQuestion]);
  }

  currentQuestion++;

  if (hearts === 0 || currentQuestion === questions.length) {
    endGame();
  } else {
    loadQuestion();
  }
}

function endGame() {
  document.getElementById("quiz-box").classList.add("hidden");

  let accuracy = (score / questions.length) * 100;

  let stars = "";
  if (accuracy >= 80) stars = "⭐⭐⭐ Brilliant!";
  else if (accuracy >= 60) stars = "⭐⭐ OK!";
  else if (accuracy >= 40) stars = "⭐ Just made it!";
  else stars = "❌ Try again!";

  let best = localStorage.getItem("bestScore") || 0;
  if (score > best) {
    localStorage.setItem("bestScore", score);
    best = score;
  }

  let wrongList = wrongQuestions.map(q => `<li>${q.question}</li>`).join("");

  document.getElementById("result-box").classList.remove("hidden");
  document.getElementById("result-box").innerHTML = `
    <h2>🎉 Game Over</h2>
    <p>Your Score: ${score}</p>
    <p>🏆 Best Score: ${best}</p>
    <p>${stars}</p>

    <h3>❌ Wrong Questions:</h3>
    <ul>${wrongList || "<li>None 🎉</li>"}</ul>

    <button onclick="restartGame()">🔄 Play Again</button>
  `;
}

function restartGame() {
  currentQuestion = 0;
  score = 0;
  hearts = 3;
  wrongQuestions = [];

  document.getElementById("quiz-box").classList.remove("hidden");
  document.getElementById("result-box").classList.add("hidden");

  loadQuestion();
}

loadQuestion();
