// js/dialog.js (classic)
window.Dialog = (() => {
  const { $, formatGrams, roundTo } = window.Utils;

  function createDialogController({ mealsById, getServings }) {
    const dlg = $("#mealDialog");
    const title = $("#dlgTitle");
    const meta = $("#dlgMeta");
    const desc = $("#dlgDesc");
    const kcal = $("#dlgKcal");
    const tech = $("#dlgTechnique");
    const mood = $("#dlgMood");
    const scale = $("#dlgScale");
    const grams = $("#dlgGrams");
    const steps = $("#dlgSteps");
    const closeBtn = $("#dlgClose");

    closeBtn?.addEventListener("click", () => dlg.close());

    function openMeal(mealId) {
      const m = mealsById[mealId];
      if (!m) return;

      const s = getServings();
      title.textContent = `${m.emoji} ${m.slot}: ${m.name}`;
      meta.textContent = `Meal ID: ${m.id}`;
      desc.textContent = m.desc;

      kcal.textContent = `~${m.kcal} kcal`;
      tech.textContent = `Technique: ${m.technique}`;
      mood.textContent = `Mood: ${m.mood}`;

      const g = m.grams || {};
      const scaled = {
        chicken: (g.chicken || 0) * s,
        potato: (g.potato || 0) * s,
        carrot: (g.carrot || 0) * s,
        broccoli: (g.broccoli || 0) * s
      };

      scale.textContent = `x${roundTo(s, 2)} servings`;
      grams.innerHTML = [
        scaled.chicken ? `Chicken: <b>${formatGrams(scaled.chicken)}</b>` : null,
        scaled.potato ? `Potato: <b>${formatGrams(scaled.potato)}</b>` : null,
        scaled.carrot ? `Carrot: <b>${formatGrams(scaled.carrot)}</b>` : null,
        scaled.broccoli ? `Broccoli: <b>${formatGrams(scaled.broccoli)}</b>` : null
      ].filter(Boolean).join("<br>");

      steps.innerHTML = (m.steps || []).map(s => `• ${s}`).join("<br>");
      dlg.showModal();
    }

    return { openMeal };
  }

  return { createDialogController };
})();
