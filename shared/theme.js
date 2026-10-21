// Light/dark toggle for [data-theme-toggle]. The saved choice is applied before first paint by an
// inline snippet in each page's <head>, so this only handles clicks.
document.querySelectorAll("[data-theme-toggle]").forEach((btn) =>
  btn.addEventListener("click", () => {
    const root = document.documentElement;
    const dark = root.dataset.theme !== "dark";
    if (dark) root.dataset.theme = "dark";
    else delete root.dataset.theme;
    try { localStorage.setItem("stillness.theme", dark ? "dark" : "light"); } catch {}
  }),
);
