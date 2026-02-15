document.addEventListener("DOMContentLoaded", () => {
  const P = window.MONEY_TYPE_PROFILES_10;

  const noData = document.getElementById("noData");
  const hero = document.getElementById("hero");
  const scoreCard = document.getElementById("scoreCard");
  const detailCard = document.getElementById("detailCard");

  const params = new URLSearchParams(location.search);
  const encoded = params.get("data");

  if (!encoded || !P) {
    if (noData) noData.style.display = "block";
    return;
  }

  let result;
  try {
    result = JSON.parse(decodeURIComponent(atob(encoded)));
  } catch (e) {
    if (noData) noData.style.display = "block";
    return;
  }

  const primaryKey = result.primaryKey;
  const secondaryKey = result.secondaryKey;

  const primary = P[primaryKey];
  const secondary = secondaryKey ? P[secondaryKey] : null;

  if (!primary) {
    if (noData) noData.style.display = "block";
    return;
  }

  // ===== HERO表示 =====

  document.getElementById("badge").textContent = "TYPE";

  document.getElementById("typeName").textContent =
    `「${primary.innerName || primary.name}」`;

  document.getElementById("typeEn").textContent =
    `（${primary.name} / ${primary.enName}）`;

  document.getElementById("tagline").textContent =
    primary.tagline || "";

  document.getElementById("primary").textContent =
    `${primary.name}（${primary.enName}）`;

  document.getElementById("secondary").textContent =
    secondary ? `${secondary.name}（${secondary.enName}）` : "—";

  document.getElementById("blendNote").textContent =
    secondary
      ? "複合型（主軸＋補助）"
      : "単独型（主軸が明確）";

  hero.style.display = "block";

  // ===== SCORE表示 =====

  const bars = document.getElementById("bars");
  const scores = result.scores || {};
  const entries = Object.entries(scores);
  const max = Math.max(...entries.map(e => e[1]), 1);

  bars.innerHTML = "";

  entries
    .sort((a, b) => b[1] - a[1])
    .forEach(([key, value]) => {
      const profile = P[key];
      if (!profile) return;

      const percent = Math.round((value / max) * 100);

      const row = document.createElement("div");
      row.className = "bar";

      row.innerHTML = `
        <div class="bar__head">
          <div class="bar__name">${profile.name}</div>
          <div class="bar__value">${value} pt</div>
        </div>
        <div class="bar__track">
          <div class="bar__fill" style="width:${percent}%"></div>
        </div>
      `;

      bars.appendChild(row);
    });

  scoreCard.style.display = "block";

  // ===== DETAIL表示 =====

  document.getElementById("essence").innerHTML =
    primary.essence || "";

  document.getElementById("strengths").innerHTML =
    primary.strengths || "";

  document.getElementById("pitfalls").innerHTML =
    primary.pitfalls || "";

  document.getElementById("position").innerHTML =
    primary.position || "";

  document.getElementById("workstyle").innerHTML =
    primary.workstyle || "";

  document.getElementById("invest").innerHTML =
    primary.invest || "";

  document.getElementById("danger").innerHTML =
    primary.danger || "";

  document.getElementById("good").innerHTML =
    primary.good || "";

  document.getElementById("jobs").innerHTML =
    primary.jobs || "";

  document.getElementById("synergy").innerHTML =
    primary.synergy || "";

  detailCard.style.display = "block";

  // ===== コピー機能 =====

  const copyBtn = document.getElementById("copyBtn");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const text =
        `【金持ちタイプ診断】\n` +
        `主軸：${primary.name}（${primary.enName}）\n` +
        `補助：${secondary ? secondary.name + "（" + secondary.enName + "）" : "—"}`;

      try {
        await navigator.clipboard.writeText(text);
        alert("コピーしました");
      } catch (e) {
        alert(text);
      }
    });
  }

  const copyAllBtn = document.getElementById("copyAllBtn");
  if (copyAllBtn) {
    copyAllBtn.addEventListener("click", async () => {
      const text =
        hero.innerText.trim() + "\n\n" +
        scoreCard.innerText.trim() + "\n\n" +
        detailCard.innerText.trim();

      try {
        await navigator.clipboard.writeText(text);
        alert("全文をコピーしました");
      } catch (e) {
        alert(text);
      }
    });
  }
});
