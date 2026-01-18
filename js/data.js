// js/data.js (classic)
window.PlanData = (() => {
  const MEALS = {
    b_hash: {
      id: "b_hash", slot: "Breakfast", emoji: "🍳",
      name: "Potato–Carrot Hash", kcal: 230,
      technique: "steam → crisp", mood: "cozy-crispy",
      desc: "Diced potato + shredded carrot. Steam-soften, then crisp in a hot nonstick pan.",
      grams: { chicken: 0, potato: 220, carrot: 120, broccoli: 0 },
      steps: [
        "Dice potato; shred carrots.",
        "Add potato + splash of water, cover 6–8 min until tender.",
        "Add carrots; cook 2–3 min uncovered.",
        "Press flat; crisp 2–4 min per side. Season boldly."
      ]
    },
    b_mash: {
      id: "b_mash", slot: "Breakfast", emoji: "🥔",
      name: "Peppery Mash Bowl", kcal: 240,
      technique: "boil → mash", mood: "soft & grounding",
      desc: "A warm bowl of mashed potatoes with cracked pepper and salt.",
      grams: { chicken: 0, potato: 300, carrot: 0, broccoli: 0 },
      steps: [
        "Cube potatoes; boil until very tender.",
        "Mash with a little hot water/broth to desired texture.",
        "Season with salt + cracked pepper (paprika optional)."
      ]
    },
    b_wedges: {
      id: "b_wedges", slot: "Breakfast", emoji: "🔥",
      name: "Roasted Wedges & Carrot Coins", kcal: 260,
      technique: "roast", mood: "snackable",
      desc: "Roasted potato wedges and caramelized carrot coins.",
      grams: { chicken: 0, potato: 260, carrot: 140, broccoli: 0 },
      steps: [
        "Cut potatoes into wedges; slice carrots into coins.",
        "Roast at 425°F for 25–35 min, flipping once.",
        "Season after roasting for maximum punch."
      ]
    },
    b_pancake: {
      id: "b_pancake", slot: "Breakfast", emoji: "🥞",
      name: "No-Oil Potato Pancake", kcal: 250,
      technique: "shred → pan-cook", mood: "tiny celebration",
      desc: "Shredded potato pressed into a pancake and cooked on nonstick until crisp.",
      grams: { chicken: 0, potato: 280, carrot: 80, broccoli: 0 },
      steps: [
        "Shred potato; squeeze out moisture with a towel.",
        "Mix in shredded carrot; season.",
        "Press into a pancake; cook 4–6 min per side."
      ]
    },
    b_soupcup: {
      id: "b_soupcup", slot: "Breakfast", emoji: "🍲",
      name: "Stew/Soup Cup", kcal: 260,
      technique: "reheat", mood: "easy-mode",
      desc: "A small bowl of leftover soup or stew (planned on purpose).",
      grams: { chicken: 60, potato: 120, carrot: 80, broccoli: 0 },
      steps: [
        "Reheat gently.",
        "Add a splash of water if thickened.",
        "Season again; leftovers love a second chance."
      ]
    },

    l_lemon: {
      id: "l_lemon", slot: "Lunch", emoji: "🍗",
      name: "Lemon Pepper Chicken & Broccoli", kcal: 360,
      technique: "pan-sear + steam", mood: "bright & clean",
      desc: "Quick sear chicken, steam broccoli in the same pan, finish with lemon-pepper seasoning.",
      grams: { chicken: 170, potato: 0, carrot: 0, broccoli: 260 },
      steps: [
        "Sear chicken 4–6 min per side (until done).",
        "Remove; add broccoli + splash water, cover 3–5 min.",
        "Season and serve."
      ]
    },
    l_garlicbowl: {
      id: "l_garlicbowl", slot: "Lunch", emoji: "🧄",
      name: "Garlic Chicken Bowl", kcal: 380,
      technique: "sear + toss", mood: "savory",
      desc: "Chicken and veg tossed hot with garlic, pepper, and chili flakes (seasoning).",
      grams: { chicken: 170, potato: 120, carrot: 0, broccoli: 200 },
      steps: [
        "Cook chicken (cubed) until browned and done.",
        "Steam potato cubes until tender.",
        "Steam broccoli, toss all together, season."
      ]
    },
    l_stirsteam: {
      id: "l_stirsteam", slot: "Lunch", emoji: "🥦",
      name: "Stir-Steam Chicken & Broccoli", kcal: 350,
      technique: "stir → steam", mood: "fast & filling",
      desc: "Stir chicken, then steam broccoli to finish.",
      grams: { chicken: 170, potato: 0, carrot: 0, broccoli: 300 },
      steps: [
        "Slice chicken thin; stir-cook until nearly done.",
        "Add broccoli + splash water; cover 3–4 min.",
        "Uncover, reduce water, season."
      ]
    },
    l_broccorice: {
      id: "l_broccorice", slot: "Lunch", emoji: "🍚",
      name: "Broccoli ‘Rice’ Bowl", kcal: 360,
      technique: "chop-fine + sauté", mood: "different texture",
      desc: "Chop broccoli very fine for a rice-like base; top with chicken.",
      grams: { chicken: 160, potato: 0, carrot: 80, broccoli: 320 },
      steps: [
        "Chop broccoli very fine.",
        "Sauté/steam 3–6 min until tender.",
        "Add cooked chicken; season."
      ]
    },
    l_soup: {
      id: "l_soup", slot: "Lunch", emoji: "🫧",
      name: "Chicken & Veg Soup", kcal: 320,
      technique: "simmer", mood: "gentle",
      desc: "Light soup with chicken, carrots, broccoli, and a little potato.",
      grams: { chicken: 140, potato: 80, carrot: 120, broccoli: 180 },
      steps: [
        "Simmer potato + carrots until tender.",
        "Add chicken + broccoli; simmer 3–5 min.",
        "Season, serve."
      ]
    },

    d_tray: {
      id: "d_tray", slot: "Dinner", emoji: "🍽️",
      name: "Sheet-Pan Chicken & Veg", kcal: 620,
      technique: "tray bake", mood: "set-and-forget",
      desc: "Roast chicken with potatoes, carrots, and broccoli for the last 12 minutes.",
      grams: { chicken: 220, potato: 300, carrot: 200, broccoli: 180 },
      steps: [
        "Roast potatoes + carrots 15 min at 425°F.",
        "Add chicken; roast 18–22 min until done.",
        "Add broccoli last 10–12 min. Season."
      ]
    },
    d_roast: {
      id: "d_roast", slot: "Dinner", emoji: "🔥",
      name: "Roast Chicken, Potatoes & Carrots", kcal: 640,
      technique: "roast", mood: "classic comfort",
      desc: "A straightforward roast platter.",
      grams: { chicken: 230, potato: 320, carrot: 220, broccoli: 0 },
      steps: [
        "Roast potatoes + carrots 25–35 min at 425°F.",
        "Bake chicken until done.",
        "Season after roasting."
      ]
    },
    d_stew: {
      id: "d_stew", slot: "Dinner", emoji: "🍲",
      name: "Hearty Chicken–Potato Stew", kcal: 660,
      technique: "simmer", mood: "blanket-in-a-bowl",
      desc: "Chunky stew with carrots and potatoes, broccoli at the end.",
      grams: { chicken: 220, potato: 340, carrot: 220, broccoli: 120 },
      steps: [
        "Simmer potatoes + carrots until nearly tender.",
        "Add chicken; season.",
        "Add broccoli last 5 min."
      ]
    },
    d_crispy: {
      id: "d_crispy", slot: "Dinner", emoji: "✨",
      name: "Crispy Chicken + Soft Potatoes", kcal: 620,
      technique: "bake + boil", mood: "contrast",
      desc: "Dry-baked chicken for crisp edges + soft boiled potatoes.",
      grams: { chicken: 240, potato: 320, carrot: 0, broccoli: 200 },
      steps: [
        "Bake chicken at 425°F until done.",
        "Boil potatoes until tender; season.",
        "Steam broccoli and serve."
      ]
    },
    d_soupbig: {
      id: "d_soupbig", slot: "Dinner", emoji: "🌙",
      name: "Carrot–Potato Soup + Shredded Chicken", kcal: 640,
      technique: "simmer", mood: "night-mode",
      desc: "Comfort soup: carrots and potatoes simmered until soft; stir in shredded chicken.",
      grams: { chicken: 220, potato: 330, carrot: 260, broccoli: 0 },
      steps: [
        "Simmer carrots + potatoes until very tender.",
        "Mash slightly in the pot for thickness.",
        "Stir in shredded chicken; season."
      ]
    }
  };

  const DAYS = [
    { n: 1, week: 1, tag: "Roast start", meals: ["b_hash","l_lemon","d_roast"] },
    { n: 2, week: 1, tag: "Soup night", meals: ["b_mash","l_stirsteam","d_soupbig"] },
    { n: 3, week: 1, tag: "Crisp day", meals: ["b_wedges","l_garlicbowl","d_crispy"] },
    { n: 4, week: 1, tag: "Stew", meals: ["b_pancake","l_broccorice","d_stew"] },
    { n: 5, week: 1, tag: "Tray bake", meals: ["b_hash","l_lemon","d_tray"] },
    { n: 6, week: 1, tag: "Easy wins", meals: ["b_soupcup","l_soup","d_crispy"] },
    { n: 7, week: 1, tag: "Reset", meals: ["b_wedges","l_stirsteam","d_tray"] },

    { n: 8, week: 2, tag: "Paprika vibe", meals: ["b_mash","l_lemon","d_tray"] },
    { n: 9, week: 2, tag: "Soup again", meals: ["b_hash","l_soup","d_soupbig"] },
    { n: 10, week: 2, tag: "Pancake joy", meals: ["b_pancake","l_broccorice","d_roast"] },
    { n: 11, week: 2, tag: "Stew night", meals: ["b_wedges","l_garlicbowl","d_stew"] },
    { n: 12, week: 2, tag: "Crisp day", meals: ["b_hash","l_stirsteam","d_crispy"] },
    { n: 13, week: 2, tag: "Leftover love", meals: ["b_soupcup","l_lemon","d_tray"] },
    { n: 14, week: 2, tag: "Finale", meals: ["b_wedges","l_soup","d_roast"] }
  ];

  return { MEALS, DAYS };
})();
