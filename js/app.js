// ===============================
// 金持ちタイプ診断 app.js（URL結果渡し・完全版）
// ===============================

// -------------------------------
// ユーティリティ：シャッフル
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
// 質問配列（表示用）
// フェーズ1：固定 / フェーズ2：ランダム
// -------------------------------
const phase1 = QUESTIONS.filter(q => q.type === "polarity");
const phase2 = QUESTIONS.filter(q => q.type !== "polarity");
const DISPLAY_QUESTIONS = [...phase1, ...shuffle(phase2)];

// -------------------------------
// 状態管理
// -------------------------------
let current = 0;
let answers = [];

// -------------------------------
// DOM取得
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

// 初期表示
quiz.style.display = "none";

// -------------------------------
// イベント
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

  // 最後まで回答 → 結果へ
  if (current >= DISPLAY_QUESTIONS.length) {
    const selectedChoices = answers.map(
      (choiceIndex, i) => DISPLAY_QUESTIONS[i].choices[choiceIndex]
    );

    const result = DIAGNOSIS.calculate(selectedChoices);

    // 結果をURLに載せる（Base64）
    const encoded = btoa(
      encodeURIComponent(JSON.stringify(result))
    );

    location.href = `result.html?data=${encoded}`;
    return;
  }

  render();
});

// -------------------------------
// 描画
// -------------------------------
function render() {
  const q = DISPLAY_QUESTIONS[current];

  questionText.textContent = q.text;
  counterText.textContent =
    `質問 ${current + 1} / ${DISPLAY_QUESTIONS.length}`;

  progressFill.style.width =
    `${Math.round(((current + 1) / DISPLAY_QUESTIONS.length) * 100)}%`;

  choicesBox.innerHTML = "";

  q.choices.forEach((choice, idx) => {
    const div = document.createElement("div");
    div.className =
      "choice" + (answers[current] === idx ? " selected" : "");
    div.textContent = choice.text;

    div.addEventListener("click", () => {
      answers[current] = idx;
      nextBtn.disabled = false;
      render();
    });

    choicesBox.appendChild(div);
  });

  prevBtn.disabled = current === 0;
  nextBtn.disabled = answers[current] == null;
}
