document.addEventListener("DOMContentLoaded", () => {
  const P = window.MONEY_TYPE_PROFILES_10;

  const noData = document.getElementById("noData");
  const hero = document.getElementById("hero");
  const scoreCard = document.getElementById("scoreCard");
  const detailCard = document.getElementById("detailCard");

  // URLから結果取得
  const params = new URLSearchParams(location.search);
  const encoded = params.get("data");

  if (!encoded || !P) {
    noData.style.display = "block";
    return;
  }

  let result;
  try {
    result = JSON.parse(decodeURIComponent(atob(encoded)));
  } catch {
    noData.style.display = "block";
    return;
  }

  const primary = P[result.primary];
  const secondary = result.secondary ? P[result.secondary] : null;

  if (!primary) {
    noData.style.display = "block";
    return;
  }

  // HERO
  document.getElementById("badge").textContent = "TYPE";
  document.getElementById("typeName").textContent = primary.name;
  document.getElementById("typeEn").textContent = primary.enName || "";
  document.getElementById("tagline").textContent = primary.tagline || "";

  document.getElementById("primary").textContent =
    `${primary.name}（${primary.enName}）`;
  document.getElementById("secondary").textContent =
    secondary ? `${secondary.name}（${secondary.enName}）` : "—";
  document.getElementById("blendNote").textContent =
    secondary ? "複合型（主軸＋補助）" : "単独型（主軸が明確）";

  hero.style.display = "block";

  // SCORE
  const bars = document.getElementById("bars");
  const entries = Object.entries(result.scores || {});
  const max = Math.max(...entries.map(e => e[1]), 1);

  bars.innerHTML = "";
  entries.sort((a, b) => b[1] - a[1]).forEach(([k, v]) => {
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
      <div class="bar__track">
        <div class="bar__fill" style="width:${pct}%"></div>
      </div>
    `;
    bars.appendChild(row);
  });

  scoreCard.style.display = "block";

  // DETAIL
  document.getElementById("essence").innerHTML = primary.essence || "";
  document.getElementById("strengths").innerHTML = primary.strengths || "";
  document.getElementById("pitfalls").innerHTML = primary.pitfalls || "";
  document.getElementById("position").innerHTML = primary.position || "";
  document.getElementById("workstyle").innerHTML = primary.workstyle || "";
  document.getElementById("invest").innerHTML = primary.invest || "";
  document.getElementById("danger").innerHTML = primary.danger || "";
  document.getElementById("good").innerHTML = primary.good || "";

  detailCard.style.display = "block";

  // COPY
  document.getElementById("copyBtn")?.addEventListener("click", async () => {
    const t =
      `【金持ちタイプ診断】\n主軸：${primary.name}（${primary.enName}）\n` +
      `補助：${secondary ? secondary.name + "（" + secondary.enName + "）" : "—"}`;
    try {
      await navigator.clipboard.writeText(t);
      alert("コピーしました");
    } catch {
      alert(t);
    }
  });

  document.getElementById("copyAllBtn")?.addEventListener("click", async () => {
    const text =
      hero.innerText.trim() + "\n\n" +
      scoreCard.innerText.trim() + "\n\n" +
      detailCard.innerText.trim();
    try {
      await navigator.clipboard.writeText(text);
      alert("全文をコピーしました");
    } catch {
      alert(text);
    }
  });
});
