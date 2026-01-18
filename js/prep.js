// js/prep.js (classic)
window.Prep = (() => {
  function getPrepGuide() {
    return [
      {
        title: "Prep Block A (Sun or Mon)",
        detail:
          "Bake 6–8 chicken breasts (salt/pepper/paprika). Roast a tray of potatoes + carrots. Steam/roast broccoli separately. Portion 6–7 containers."
      },
      {
        title: "Prep Block B (Thu)",
        detail:
          "Repeat chicken + potatoes/carrots. Make a big pot of carrot–potato soup or chicken–potato stew for 2–3 dinners + 1–2 breakfasts (soup cup)."
      },
      {
        title: "Texture trick (anti-boredom)",
        detail:
          "Keep some potatoes as mash, some as wedges, some as cubes. Same ingredient, different vibe."
      }
    ];
  }

  return { getPrepGuide };
})();
