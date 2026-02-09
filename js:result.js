document.addEventListener("DOMContentLoaded", () => {
  const R = window.DIAGNOSIS;
  const P = window.MONEY_TYPE_PROFILES_10;

  const raw = localStorage.getItem("result");
  const noData = document.getElementById("noData");
  const hero = document.getElementById("hero");
  const scoreCard = document.getElementById("scoreCard");
  const detailCard = document.getElementById("detailCard");

  if (!raw || !P) {
    if (noData) noData.style.display = "block";
    return;
  }

  const result = JSON.parse(raw);
  const primaryKey = result.primary;
  const secondaryKey = result.secondary;

  const primary = P[primaryKey];
  const secondary = secondaryKey ? P[secondaryKey] : null;

  if (!primary) {
    if (noData) noData.style.display = "block";
    return;
  }

  // HERO
  document.getElementById("badge").textContent = "TYPE";
  document.getElementById("typeName").textContent = primary.name;
  document.getElementById("typeEn").textContent = primary.enName || "";
  document.getElementById("tagline").textContent = primary.tagline || "";

  document.getElementById("primary").textContent = `${primary.name}（${primary.enName}）`;
  document.getElementById("secondary").textContent = secondary ? `${secondary.name}（${secondary.enName}）` : "—";
  document.getElementById("blendNote").textContent = secondary ? "複合型（主軸＋補助）" : "単独型（主軸が明確）";

  hero.style.display = "block";

  // SCORE
  const bars = document.getElementById("bars");
  const scores = result.scores || {};
  const entries = Object.entries(scores);
  const max = Math.max(...entries.map(e => e[1]), 1);

  bars.innerHTML = "";
  entries
    .sort((a,b) => b[1]-a[1])
    .forEach(([k,v]) => {
      const prof = P[k];
      if (!prof) return;
      const pct = Math.round((v / max) * 100);
      const row = document.createElement("div");
      row.className = "bar";
      row.innerHTML = `
        <div class="bar__head">
          <div class="bar__name">${prof.name}</div>
          <div class="bar__value">${v} pt</div>
        </div>
        <div class="bar__track"><div class="bar__fill" style="width:${pct}%"></div></div>
      `;
      bars.appendChild(row);
    });

  scoreCard.style.display = "block";

  // DETAIL（10タイプ用）
  document.getElementById("essence").innerHTML = primary.essence || "";
  document.getElementById("strengths").innerHTML = primary.strengths || "";
  document.getElementById("pitfalls").innerHTML = primary.pitfalls || "";
  document.getElementById("position").innerHTML = primary.position || "";
  document.getElementById("workstyle").innerHTML = primary.workstyle || "";
  document.getElementById("invest").innerHTML = primary.invest || "";
  document.getElementById("danger").innerHTML = primary.danger || "";
  document.getElementById("good").innerHTML = primary.good || "";

  detailCard.style.display = "block";

  // COPY（短文）
  document.getElementById("copyBtn")?.addEventListener("click", async () => {
    const t = `【金持ちタイプ診断】\n主軸：${primary.name}（${primary.enName}）\n補助：${secondary ? secondary.name + "（" + secondary.enName + "）" : "—"}`;
    try {
      await navigator.clipboard.writeText(t);
      alert("コピーしました");
    } catch {
      alert(t);
    }
  });

  // COPY ALL（AI用：画面の表示をそのまま）
  document.getElementById("copyAllBtn")?.addEventListener("click", async () => {
    const text =
      `【金持ちタイプ診断｜公式結果】\n\n` +
      hero.innerText.trim() + `\n\n` +
      scoreCard.innerText.trim() + `\n\n` +
      detailCard.innerText.trim();

    try {
      await navigator.clipboard.writeText(text);
      alert("全文をコピーしました。myGPTに貼り付けてください。");
    } catch {
      alert(text);
    }
  });
});
