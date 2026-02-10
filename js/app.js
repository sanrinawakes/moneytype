// ※ shuffle関数などは既存のものをそのまま使ってください
function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const phase1 = QUESTIONS.filter(q => q.type === "polarity");
const phase2 = QUESTIONS.filter(q => q.type !== "polarity");
const DISPLAY_QUESTIONS = [...phase1, ...shuffle(phase2)];

let current = 0;
let answers = [];
const shuffledChoicesMap = {};

const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const questionText = document.getElementById("questionText");
const counterText = document.getElementById("counterText");
const choicesBox = document.getElementById("choices");
const progressFill = document.getElementById("progressFill");

quiz.style.display = "none";

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

prevBtn.addEventListener("click", () => {
  if (current > 0) {
    current--;
    render();
  }
});

nextBtn.addEventListener("click", () => {
  if (answers[current] == null) return;
  current++;

  if (current >= DISPLAY_QUESTIONS.length) {
    // 回答データを抽出
    const selectedChoices = answers.map((choiceIndex, i) => {
      const shuffled = shuffledChoicesMap[i];
      return shuffled.find(s => s.index === choiceIndex).choice;
    });

    // 計算実行（ここが重要）
    const result = window.DIAGNOSIS.calculate(selectedChoices);
    const encoded = btoa(encodeURIComponent(JSON.stringify(result)));
    location.href = `result.html?data=${encoded}`;
    return;
  }
  render();
});

function render() {
  const q = DISPLAY_QUESTIONS[current];
  questionText.textContent = q.text;
  counterText.textContent = `質問 ${current + 1} / ${DISPLAY_QUESTIONS.length}`;
  progressFill.style.width = `${Math.round(((current + 1) / DISPLAY_QUESTIONS.length) * 100)}%`;

  if (!shuffledChoicesMap[current]) {
    shuffledChoicesMap[current] = shuffle(
      q.choices.map((choice, index) => ({ choice, index }))
    );
  }

  const shuffled = shuffledChoicesMap[current];
  choicesBox.innerHTML = "";

  shuffled.forEach(({ choice, index }) => {
    const div = document.createElement("div");
    div.className = "choice" + (answers[current] === index ? " selected" : "");
    div.textContent = choice.text;
    div.addEventListener("click", () => {
      answers[current] = index;
      render();
    });
    choicesBox.appendChild(div);
  });

  prevBtn.disabled = current === 0;
  nextBtn.disabled = answers[current] == null;
}
