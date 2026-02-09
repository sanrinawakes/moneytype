// ===============================
// 金持ちタイプ診断 app.js（質問ランダム対応・完全版）
// ===============================

// -------------------------------
// ユーティリティ：シャッフル（元配列は壊さない）
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
// 質問配列の準備
// フェーズ1：固定 / フェーズ2：ランダム
// -------------------------------
const phase1 = QUESTIONS.filter(q => q.type === "polarity");
const phase2 = QUESTIONS.filter(q => q.type !== "polarity");

// 表示専用（これだけを使う）
const DISPLAY_QUESTIONS = [
  ...phase1,
  ...shuffle(phase2)
];

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

// -------------------------------
// 初期表示
// -------------------------------
quiz.style.display = "none";

// -------------------------------
// イベント
// -------------------------------

// 診断開始
startBtn.addEventListener("click", () => {
  intro.style.display = "none";
  quiz.style.display = "block";
  render();
});

// 最初から
resetBtn.addEventListener("click", () => {
  current = 0;
  answers = [];
  quiz.style.display = "none";
  intro.style.display = "block";
});

// 前へ
prevBtn.addEventListener("click", () => {
  if (current > 0) {
    current--;
    render();
  }
});

// 次へ
nextBtn.addEventListener("click", () => {
  if (answers[current] == null) return;

  current++;

  // 最後まで回答したら結果へ
  if (current >= DISPLAY_QUESTIONS.length) {
    const selectedChoices = answers.map(
      (choiceIndex, i) => DISPLAY_QUESTIONS[i].choices[choiceIndex]
    );

    const result = DIAGNOSIS.calculate(selectedChoices);
    localStorage.setItem("result", JSON.stringify(result));
    location.href = "result.html";
    return;
  }

  render();
});

// -------------------------------
// 描画処理
// -------------------------------
function render() {
  const q = DISPLAY_QUESTIONS[current];

  // 質問文
  questionText.textContent = q.text;

  // カウンター
  counterText.textContent =
    `質問 ${current + 1} / ${DISPLAY_QUESTIONS.length}`;

  // プログレスバー
  const progress = Math.round(
    ((current + 1) / DISPLAY_QUESTIONS.length) * 100
  );
  progressFill.style.width = `${progress}%`;

  // 選択肢描画
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

  // ボタン状態
  prevBtn.disabled = current === 0;
  nextBtn.disabled = answers[current] == null;
}
