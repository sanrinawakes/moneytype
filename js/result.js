document.addEventListener("DOMContentLoaded", () => {
  const P = window.MONEY_TYPE_PROFILES_10;

  const noData = document.getElementById("noData");
  const hero = document.getElementById("hero");
  const scoreCard = document.getElementById("scoreCard");
  const detailCard = document.getElementById("detailCard");

  // URLから data を取得
  const params = new URLSearchParams(location.search);
  const encoded = params.get("data");

  if (!encoded || !P) {
    noData.style.display = "block";
    return;
  }

  let result;
  try {
    // デコード処理
    result = JSON.parse(decodeURIComponent(atob(encoded)));
  } catch (e) {
    console.error("Decode Error:", e);
    noData.style.display = "block";
    return;
  }

  // logic.js で定義したキー名で取得
  const primaryKey = result.primaryKey;
  const secondaryKey = result.secondaryKey;

  const primary = P[primaryKey];
  const secondary = secondaryKey ? P[secondaryKey] : null;

  if (!primary) {
    noData.style.display = "block";
    return;
  }

  // ===== HERO エリア =====
  document.getElementById("badge").textContent = "TYPE";
  document.getElementById("typeName").textContent = primary.name;
  document.getElementById("typeEn").textContent = primary.enName || "";
  document.getElementById("tagline").textContent = primary.tagline || "";

  document.getElementById("primary").textContent = `${primary.name}（${primary.enName}）`;
  document.getElementById("secondary").textContent = secondary ? `${secondary.name}（${secondary.enName}）` : "—";
  document.getElementById("blendNote").textContent = secondary ? "複合型（主軸＋補助）" : "単独型（主軸が明確）";

  hero.style.display = "block";

  // ===== スコア内訳 =====
  const bars = document.getElementById("bars");
  const scores = result.scores || {};
  const entries = Object.entries(scores);
  const max = Math.max(...entries.map(e => e[1]), 1);

  bars.innerHTML = "";
  entries
    .sort((a, b) => b[1] - a[1])
    .forEach(([k, v]) => {
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

  // ===== 詳細パネル（すべての項目を反映） =====
  const fields = ["essence", "strengths", "pitfalls", "position", "workstyle", "invest", "danger", "good", "jobs", "synergy"];
  fields.forEach(f => {
    const el = document.getElementById(f);
    if (el) el.innerHTML = primary[f] || "";
  });

  detailCard.style.display = "block";

  // コピーボタンの設定
  document.getElementById("copyBtn")?.addEventListener("click", async () => {
    const t = `【金持ちタイプ診断】\n主軸：${primary.name}（${primary.enName}）\n補助：${secondary ? secondary.name + "（" + secondary.enName + "）" : "—"}`;
    try {
      await navigator.clipboard.writeText(t);
      alert("コピーしました");
    } catch {
      alert(t);
    }
  });

  document.getElementById("copyAllBtn")?.addEventListener("click", async () => {
    const text = hero.innerText.trim() + "\n\n" + scoreCard.innerText.trim() + "\n\n" + detailCard.innerText.trim();
    try {
      await navigator.clipboard.writeText(text);
      alert("全文をコピーしました");
    } catch {
      alert(text);
    }
  });
});
