// js/render.js (classic)
window.Render = (() => {
  const { formatGrams, roundTo } = window.Utils;
  const { DAYS, MEALS } = window.PlanData;

  function dayTotalKcal(day) {
    return day.meals.reduce((acc, id) => acc + (MEALS[id]?.kcal ?? 0), 0);
  }

  function createDayOptions(daySelect) {
    daySelect.innerHTML = "";
    for (const d of DAYS) {
      const opt = document.createElement("option");
      opt.value = String(d.n);
      opt.textContent = `Day ${d.n} (W${d.week}) • ${d.tag}`;
      daySelect.appendChild(opt);
    }
  }

  function renderGrid({ gridEl, state, onSelectDay, onToggleMeal, onOpenDetails, filterText }) {
    const q = (filterText || "").trim().toLowerCase();
    gridEl.innerHTML = "";

    for (const d of DAYS) {
      if (q) {
        const matches = d.meals.some(mid => {
          const m = MEALS[mid];
          const hay = `${m.name} ${m.desc} ${m.technique} ${m.mood} ${m.slot}`.toLowerCase();
          return hay.includes(q);
        });
        if (!matches) continue;
      }

      const totalK = dayTotalKcal(d);
      const dayDiv = document.createElement("div");
      dayDiv.className = "day";
      dayDiv.dataset.day = String(d.n);

      if (state.selectedDay === d.n) {
        dayDiv.style.outline = "2px solid rgba(125,247,215,.35)";
      }

      dayDiv.innerHTML = `
        <div class="dayTop">
          <div class="dayTitle">
            <div class="d">Day ${d.n}</div>
            <span class="tag">Week ${d.week} • ${d.tag}</span>
          </div>
          <div class="kcal">~${totalK} kcal</div>
        </div>
        <div class="meals"></div>
      `;

      const mealsWrap = dayDiv.querySelector(".meals");

      for (const mid of d.meals) {
        const m = MEALS[mid];
        const key = `${d.n}:${mid}`;
        const checked = !!state.done[key];

        const mealDiv = document.createElement("div");
        mealDiv.className = "meal";
        mealDiv.dataset.meal = mid;

        mealDiv.innerHTML = `
          <div class="mealHead">
            <div class="mealName"><span class="emoji">${m.emoji}</span> ${m.slot}: ${m.name}</div>
            <div class="mealMeta">~${m.kcal} kcal</div>
          </div>
          <div class="mealDesc">${m.desc}</div>
          <div class="checkRow">
            <label class="checkbox">
              <input type="checkbox" ${checked ? "checked" : ""} aria-label="Mark ${m.name} done">
              Done
            </label>
            <button class="miniBtn" type="button">Details</button>
          </div>
        `;

        mealDiv.querySelector('input[type="checkbox"]').addEventListener("change", (e) => {
          onToggleMeal(d.n, mid, e.target.checked);
        });

        mealDiv.querySelector("button.miniBtn").addEventListener("click", () => onOpenDetails(mid));

        mealsWrap.appendChild(mealDiv);
      }

      dayDiv.addEventListener("click", (e) => {
        if (e.target.closest("button") || e.target.closest("label")) return;
        onSelectDay(d.n);
      });

      gridEl.appendChild(dayDiv);
    }
  }

  function renderSidebarForDay({ dayNumber, state, servings, progressTextEl, barFillEl, chipsEl, gramsListEl }) {
    const day = DAYS.find(d => d.n === dayNumber);
    if (!day) return;

    const keys = day.meals.map(mid => `${day.n}:${mid}`);
    const doneCount = keys.filter(k => !!state.done[k]).length;
    const pct = Math.round((doneCount / keys.length) * 100);

    const totalK = dayTotalKcal(day);
    const completedK = day.meals.reduce((acc, mid) => {
      return acc + (state.done[`${day.n}:${mid}`] ? (MEALS[mid]?.kcal ?? 0) : 0);
    }, 0);

    progressTextEl.textContent =
      `Day ${day.n} • ${doneCount}/${keys.length} meals done • ~${completedK}/${totalK} kcal completed.`;

    barFillEl.style.width = `${pct}%`;

    chipsEl.innerHTML = `
      <span class="chip"><b>Week</b> ${day.week}</span>
      <span class="chip"><b>Tag</b> ${day.tag}</span>
      <span class="chip"><b>Servings</b> x${roundTo(servings, 2)}</span>
      <span class="chip"><b>Completion</b> ${pct}%</span>
    `;

    gramsListEl.innerHTML = "";
    for (const mid of day.meals) {
      const m = MEALS[mid];
      const g = m.grams || {};
      const scaled = {
        chicken: (g.chicken || 0) * servings,
        potato: (g.potato || 0) * servings,
        carrot: (g.carrot || 0) * servings,
        broccoli: (g.broccoli || 0) * servings
      };

      const li = document.createElement("li");
      li.className = "li";
      li.innerHTML = `
        <div class="liTop">
          <strong>${m.slot}: ${m.name}</strong>
          <span class="grams">~${m.kcal} kcal</span>
        </div>
        <div class="muted" style="margin-top:8px;">
          ${scaled.chicken ? `Chicken: <b>${formatGrams(scaled.chicken)}</b><br>` : ""}
          ${scaled.potato ? `Potato: <b>${formatGrams(scaled.potato)}</b><br>` : ""}
          ${scaled.carrot ? `Carrot: <b>${formatGrams(scaled.carrot)}</b><br>` : ""}
          ${scaled.broccoli ? `Broccoli: <b>${formatGrams(scaled.broccoli)}</b>` : ""}
        </div>
      `;
      gramsListEl.appendChild(li);
    }
  }

  function computeShoppingTotals(servings = 1) {
    const totals = { chicken: 0, potato: 0, carrot: 0, broccoli: 0 };
    for (const d of DAYS) {
      for (const mid of d.meals) {
        const g = MEALS[mid]?.grams || {};
        totals.chicken += (g.chicken || 0) * servings;
        totals.potato += (g.potato || 0) * servings;
        totals.carrot += (g.carrot || 0) * servings;
        totals.broccoli += (g.broccoli || 0) * servings;
      }
    }
    return totals;
  }

  function renderShopList(shopListEl, totals) {
    const gToLb = (g) => g / 453.59237;
    const rows = [
      { title: "Chicken breast", grams: totals.chicken, note: "Family packs save $/lb." },
      { title: "Potatoes", grams: totals.potato, note: "10 lb bag usually wins." },
      { title: "Carrots", grams: totals.carrot, note: "5 lb bag is usually cheapest." },
      { title: "Broccoli", grams: totals.broccoli, note: "Frozen florets = great value." }
    ];

    shopListEl.innerHTML = "";
    for (const r of rows) {
      const li = document.createElement("li");
      li.className = "li";
      li.innerHTML = `
        <div class="liTop">
          <strong>${r.title}</strong>
          <span class="grams">${Math.round(gToLb(r.grams) * 10) / 10} lb</span>
        </div>
        <div class="muted" style="margin-top:8px;">~${Math.round(r.grams)}g total. ${r.note}</div>
      `;
      shopListEl.appendChild(li);
    }
  }

  return {
    createDayOptions,
    renderGrid,
    renderSidebarForDay,
    computeShoppingTotals,
    renderShopList
  };
})();
