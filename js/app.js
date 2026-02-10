// ===============================
// 金持ちタイプ診断 app.js
// 質問順ランダム + 選択肢順ランダム（完全対応版）
// ===============================

// -------------------------------
// シャッフル（非破壊）
// -------------------------------
function shuffle(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// -------------------------------
// 質問配列
// フェーズ1：固定 / フェーズ2：ランダム
// -------------------------------
const phase1 = QUESTIONS.filter(q => q.type === "polarity");
const phase2 = QUESTIONS.filter(q => q.type !== "polarity");
const DISPLAY_QUESTIONS = [...phase1, ...shuffle(phase2)];

// -------------------------------
// state
// -------------------------------
let current = 0;

// answers には「元の choices の index」を保存
let answers = [];

// 各質問ごとの「シャッフル済み選択肢」を保持
// key = 質問の index
const shuffledChoicesMap = {};

// -------------------------------
// DOM
// -------------------------------
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

// -------------------------------
// events
// -------------------------------
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
    const selectedChoices = answers.map(
      (choiceIndex, i) => DISPLAY_QUESTIONS[i].choices[choiceIndex]
    );

    const result = DIAGNOSIS.calculate(selectedChoices);
    const encoded = btoa(encodeURIComponent(JSON.stringify(result)));
    location.href = `result.html?data=${encoded}`;
    return;
  }

  render();
});

// -------------------------------
// render
// -------------------------------
function render() {
  const q = DISPLAY_QUESTIONS[current];

  questionText.textContent = q.text;
  counterText.textContent =
    `質問 ${current + 1} / ${DISPLAY_QUESTIONS.length}`;

  progressFill.style.width =
    `${Math.round(((current + 1) / DISPLAY_QUESTIONS.length) * 100)}%`;

  // ★ この質問の選択肢を初回だけシャッフル
  if (!shuffledChoicesMap[current]) {
    shuffledChoicesMap[current] = shuffle(
      q.choices.map((choice, index) => ({
        choice,
        index // 元の index を保持
      }))
    );
  }

  const shuffled = shuffledChoicesMap[current];

  choicesBox.innerHTML = "";

  shuffled.forEach(({ choice, index }) => {
    const div = document.createElement("div");
    div.className =
      "choice" + (answers[current] === index ? " selected" : "");
    div.textContent = choice.text;

    div.addEventListener("click", () => {
      answers[current] = index;
      nextBtn.disabled = false;
      render();
    });

    choicesBox.appendChild(div);
  });

  prevBtn.disabled = current === 0;
  nextBtn.disabled = answers[current] == null;
}
