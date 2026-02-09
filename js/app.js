let current = 0;
let answers = [];

function render() {
  const q = QUESTIONS[current];
  document.getElementById("questionText").innerText = q.text;
  document.getElementById("counterText").innerText =
    `質問 ${current + 1} / ${QUESTIONS.length}`;

  const box = document.getElementById("choices");
  box.innerHTML = "";

  q.choices.forEach(c => {
    const div = document.createElement("div");
    div.className = "choice";
    div.innerText = c.text;
    div.onclick = () => next(c);
    box.appendChild(div);
  });

  const progress = Math.round(((current + 1) / QUESTIONS.length) * 100);
  document.getElementById("progressFill").style.width = progress + "%";
}

function next(choice) {
  answers.push(choice);
  current++;

  if (current >= QUESTIONS.length) {
    const result = DIAGNOSIS.calculate(answers);
    localStorage.setItem("result", JSON.stringify(result));
    location.href = "result.html";
  } else {
    render();
  }
}

window.onload = render;
