// js/utils.js (classic)
window.Utils = (() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  const roundTo = (n, digits = 0) => {
    const p = Math.pow(10, digits);
    return Math.round(n * p) / p;
  };
  const formatGrams = (g) => `${Math.round(g)}g`;

  const debounce = (fn, ms = 150) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), ms);
    };
  };

  return { $, $$, clamp, roundTo, formatGrams, debounce };
})();
