// ===============================
// 金持ちタイプ診断 app.js（完全版）
// ・フェーズ1固定 / フェーズ2ランダム
// ・診断後にだけ「結果ページ」ボタンを表示
// ・結果はURL(data=...)で渡す（iPhone/LINE内ブラウザでも消えない）
// ===============================

// -------------------------------
// shuffle（非破壊）
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
// 質問配列：フェーズ1固定 / フェーズ2ランダム
// -------------------------------
const phase1 = QUESTIONS.filter(q => q.type === "polarity");
const phase2 = QUESTIONS.filter(q => q.type !== "polarity");
const DISPLAY_QUESTIONS = [...phase1, ...shuffle(phase2)];

// -------------------------------
// state
// -------------------------------
let current = 0;
let answers = [];

// -------------------------------
// DOM
// -------------------------------
const intro = document.getElementById("intro");
const quiz = document.getElementById("quiz");

const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const restartBtn = document.getElementById("restartBtn");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const questionText = document.getElementById("questionText");
const counterText = document.getElementById("counterText");
const choicesBox = document.getElementById("choices");
const progressFill = document.getElementById("progressFill");

const questionArea = document.getElementById("questionArea");
const doneArea = document.getElementById("doneArea");

const resultLink = document.getElementById("resultLink");
const goResultBtn = document.getElementById("goResultBtn");

// 初期
quiz.style.display = "none";
doneArea.style.display = "none";
questionArea.style.display = "block";
resultLink.style.display = "none";

// -------------------------------
// ヘルパー：結果URLを保存＆ボタン表示
// -------------------------------
function setResultUrl(resultUrl) {
  // iPhoneでも同一タブ内なら維持されやすい
  sessionStorage.setItem("lastResultUrl", resultUrl);

  // ヘッダーの結果ボタン
  resultLink.href = resultUrl;
  resultLink.style.display = "inline-flex";

  // 完了画面のボタン
  goResultBtn.href = resultUrl;
}

// 戻ってきた時用（診断後に戻るケース）
const last = sessionStorage.getItem("lastResultUrl");
if (last) {
  setResultUrl(last);
}

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
  doneArea.style.display = "none";
  questionArea.style.display = "block";
  quiz.style.display = "none";
  intro.style.display = "block";
});

restartBtn.addEventListener("click", () => {
  // 診断完了画面からやり直す
  current = 0;
  answers = [];
  doneArea.style.display = "none";
  questionArea.style.display = "block";
  render();
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

  // 最後まで回答したら結果作成 → 完了画面へ
  if (current >= DISPLAY_QUESTIONS.length) {
    const selectedChoices = answers.map(
      (choiceIndex, i) => DISPLAY_QUESTIONS[i].choices[choiceIndex]
    );

    const result = DIAGNOSIS.calculate(selectedChoices);
    const encoded = btoa(encodeURIComponent(JSON.stringify(result)));

    const resultUrl = `result.html?data=${encoded}`;
    setResultUrl(resultUrl);

    // 完了画面を表示（ここで初めて「結果ページ」へ誘導）
    questionArea.style.display = "none";
    doneArea.style.display = "block";
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
  counterText.textContent = `質問 ${current + 1} / ${DISPLAY_QUESTIONS.length}`;

  const progress = Math.round(((current + 1) / DISPLAY_QUESTIONS.length) * 100);
  progressFill.style.width = `${progress}%`;

  // 選択肢表示（順番はそのまま）
  choicesBox.innerHTML = "";
  q.choices.forEach((choice, idx) => {
    const div = document.createElement("div");
    div.className = "choice" + (answers[current] === idx ? " selected" : "");
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
