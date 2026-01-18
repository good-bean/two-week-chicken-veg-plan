// js/storage.js (classic)
window.Storage = (() => {
  const KEY = "chickenVegPlan.v1";

  function loadState() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      return true;
    } catch {
      return false;
    }
  }

  return { loadState, saveState };
})();
