let current = 0;
let answers = [];

const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const startBtn = document.getElementById("startBtn");

const questionText = document.getElementById("questionText");
const counterText = document.getElementById("counterText");
const choicesBox = document.getElementById("choices");
const progressFill = document.getElementById("progressFill");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const resetBtn = document.getElementById("resetBtn");

startBtn.addEventListener("click", () => {
  intro.style.display = "none";
  quiz.style.display = "block";
  render();
});

resetBtn.addEventListener("click", () => {
  current = 0;
  answers = [];
  quiz.style.display = "none";
  intro.style.display = "block";
});

nextBtn.addEventListener("click", () => {
  if (answers[current] == null) return;
  current++;
  if (current >= QUESTIONS.length) {
    const result = DIAGNOSIS.calculate(answers);
    localStorage.setItem("result", JSON.stringify(result));
    location.href = "result.html";
  } else {
    render();
  }
});

prevBtn.addEventListener("click", () => {
  if (current > 0) {
    current--;
    render();
  }
});

function render() {
  const q = QUESTIONS[current];

  questionText.textContent = q.text;
  counterText.textContent = `質問 ${current + 1} / ${QUESTIONS.length}`;
  progressFill.style.width = `${Math.round(((current + 1) / QUESTIONS.length) * 100)}%`;

  choicesBox.innerHTML = "";
  q.choices.forEach((c, idx) => {
    const div = document.createElement("div");
    div.className = "choice" + (answers[current] === c ? " selected" : "");
    div.textContent = c.text;
    div.onclick = () => {
      answers[current] = c;
      nextBtn.disabled = false;
      render();
    };
    choicesBox.appendChild(div);
  });

  nextBtn.disabled = answers[current] == null;
  prevBtn.disabled = current === 0;
}
