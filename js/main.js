// js/main.js (classic)
(() => {
  const { $, debounce, clamp } = window.Utils;
  const { loadState, saveState } = window.Storage;
  const { DAYS, MEALS } = window.PlanData;
  const {
    createDayOptions,
    renderGrid,
    renderSidebarForDay,
    computeShoppingTotals,
    renderShopList
  } = window.Render;
  const { createDialogController } = window.Dialog;
  const { getPrepGuide } = window.Prep;

  const els = {
    grid: $("#grid"),
    servings: $("#servings"),
    daySelect: $("#daySelect"),
    search: $("#search"),
    togglePrep: $("#togglePrep"),
    print: $("#print"),
    saveStatus: $("#saveStatus"),

    progressText: $("#progressText"),
    barFill: $("#barFill"),
    chips: $("#chips"),
    gramsList: $("#gramsList"),
    shopList: $("#shopList"),

    prepBox: $("#prepBox"),
    prepList: $("#prepList")
  };

  const defaultState = {
    servings: 1,
    selectedDay: 1,
    prepMode: false,
    search: "",
    done: {}
  };

  const state = hydrateState();

  const dialog = createDialogController({
    mealsById: MEALS,
    getServings: () => state.servings
  });

  init();

  function hydrateState() {
    const saved = loadState();
    if (!saved) return structuredClone(defaultState);

    return {
      ...structuredClone(defaultState),
      ...saved,
      servings: clamp(Number(saved.servings ?? 1), 0.5, 4),
      selectedDay: clamp(Number(saved.selectedDay ?? 1), 1, 14),
      done: saved.done && typeof saved.done === "object" ? saved.done : {}
    };
  }

  function init() {
    els.servings.value = String(state.servings);
    els.search.value = state.search || "";

    createDayOptions(els.daySelect);
    els.daySelect.value = String(state.selectedDay);

    applyPrepModeUI();
    renderPrepGuide();
    renderShopping();
    renderAll();

    els.servings.addEventListener("input", () => {
      state.servings = clamp(Number(els.servings.value || 1), 0.5, 4);
      persist();
      renderAll();
    });

    els.daySelect.addEventListener("change", () => {
      state.selectedDay = Number(els.daySelect.value);
      persist();
      renderAll();
      focusDayCard(state.selectedDay);
    });

    els.search.addEventListener("input", debounce(() => {
      state.search = els.search.value;
      persist();
      renderAll();
    }, 120));

    els.togglePrep.addEventListener("click", () => {
      state.prepMode = !state.prepMode;
      persist();
      applyPrepModeUI();
    });

    els.print.addEventListener("click", () => window.print());

    window.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== els.search) {
        e.preventDefault();
        els.search.focus();
      }
      if (e.key === "Escape" && document.activeElement === els.search) {
        els.search.value = "";
        state.search = "";
        persist();
        renderAll();
        els.search.blur();
      }
    });
  }

  function applyPrepModeUI() {
    els.prepBox.hidden = !state.prepMode;
    els.togglePrep.textContent = state.prepMode ? "Prep-once Mode: ON" : "Prep-once Mode";
  }

  function renderPrepGuide() {
    const guide = getPrepGuide();
    els.prepList.innerHTML = "";
    for (const g of guide) {
      const li = document.createElement("li");
      li.className = "li";
      li.innerHTML = `
        <div class="liTop"><strong>${g.title}</strong><span class="grams">batch</span></div>
        <div class="muted" style="margin-top:8px;">${g.detail}</div>
      `;
      els.prepList.appendChild(li);
    }
  }

  function renderShopping() {
    const totals = computeShoppingTotals(state.servings);
    renderShopList(els.shopList, totals);
  }

  function renderAll() {
    renderGrid({
      gridEl: els.grid,
      state,
      filterText: state.search,
      onSelectDay: (dayN) => {
        state.selectedDay = dayN;
        els.daySelect.value = String(dayN);
        persist();
        renderAll();
        focusDayCard(dayN);
      },
      onToggleMeal: (dayN, mealId, checked) => {
        state.done[`${dayN}:${mealId}`] = checked;
        persist();
        renderSidebarOnly();
      },
      onOpenDetails: (mealId) => dialog.openMeal(mealId)
    });

    renderSidebarOnly();
    renderShopping();
  }

  function renderSidebarOnly() {
    renderSidebarForDay({
      dayNumber: state.selectedDay,
      state,
      servings: state.servings,
      progressTextEl: els.progressText,
      barFillEl: els.barFill,
      chipsEl: els.chips,
      gramsListEl: els.gramsList
    });
  }

  function persist() {
    const ok = saveState(state);
    if (els.saveStatus) els.saveStatus.textContent = ok ? "Saved ✓" : "Not saved";
  }

  function focusDayCard(dayN) {
    const el = els.grid?.querySelector(`.day[data-day="${dayN}"]`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
})();
