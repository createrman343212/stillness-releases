// Renders every published release into [data-release-list] from the GitHub API (it sends CORS
// headers; release-asset URLs do not). Download buttons point straight at the installer file.
// Loaded after i18n.js (both deferred, sharing one global scope), which defines t(). Wrapped so its
// helpers do not clash with the globals in release.js.

(() => {
  const RELEASES_API = "https://api.github.com/repos/createrman343212/stillness-releases/releases?per_page=100";
  const list = document.querySelector("[data-release-list]");
  let releases = null; // null = loading, [] or array = loaded, "error" = failed

  // Windows and macOS ship independently as windows-vX.Y.Z / macos-vX.Y.Z; older shared v0.x tags never
  // match a prefix, so they are not offered. The tab comes from #windows / #macos, else the visitor's OS
  // (visitorOs() is defined in release.js, loaded just before this file).
  const INSTALLER = { windows: /-setup\.exe$/i, macos: /\.dmg$/i };
  const fromHash = () => (location.hash === "#macos" || location.hash === "#windows" ? location.hash.slice(1) : null);
  let tab = fromHash() || visitorOs();
  document.querySelectorAll("[data-os-tab]").forEach((b) =>
    b.addEventListener("click", () => {
      tab = b.dataset.osTab;
      history.replaceState(null, "", `#${tab}`);
      render();
    }),
  );
  addEventListener("hashchange", () => {
    tab = fromHash() || tab;
    render();
  });

  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  // Inline `code` only; the notes are our own commit subjects, not arbitrary Markdown.
  const inline = (s) => esc(s).replace(/`([^`]+)`/g, "<code>$1</code>");

  // Bullet lines of the release body, each tagged by its conventional-commit type. A body may hold one
  // section per language, each opened by an invisible `<!-- ko -->` / `<!-- en -->` / `<!-- ja -->`
  // marker line; the page's language is preferred, then English, then whatever exists. Text before the
  // first marker (and bodies without markers, i.e. commit-subject notes) counts as Korean.
  function notes(body) {
    const sections = {};
    let lang = "ko";
    for (const l of (body || "").split("\n")) {
      const m = /^<!--\s*([a-z]{2})\s*-->$/.exec(l.trim());
      if (m) lang = m[1];
      else if (l.startsWith("- ")) (sections[lang] ??= []).push(l);
    }
    const page = document.documentElement.lang || "en";
    const pick = [page, "en"].find((l) => sections[l]) ?? Object.keys(sections)[0];
    const items = (sections[pick] || []).map((l) => {
      const m = /^- (feat|fix|refactor|chore|docs):\s*(.*)$/.exec(l);
      return m ? { type: m[1], text: m[2] } : { type: "", text: l.slice(2) };
    });
    return { lang: pick, items };
  }

  function date(iso) {
    const code = document.documentElement.lang || "en";
    return new Intl.DateTimeFormat(code, { year: "numeric", month: "long", day: "numeric" }).format(new Date(iso));
  }

  function render() {
    document.querySelectorAll("[data-os-tab]").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.osTab === tab)));
    document.querySelectorAll("[data-tab-platform]").forEach((el) => (el.textContent = t(`cta.platform.${tab}`)));
    if (releases === null) {
      list.innerHTML = `<p class="rel-state">${esc(t("rel.loading"))}</p>`;
      return;
    }
    if (releases === "error") {
      list.innerHTML = `<div class="rel-state"><p>${esc(t("rel.error"))}</p><button type="button" class="btn ghost small" data-retry>${esc(t("rel.retry"))}</button></div>`;
      list.querySelector("[data-retry]").addEventListener("click", load);
      return;
    }
    const prefix = `${tab}-v`;
    const shown = releases.filter((r) => r.tag_name.startsWith(prefix));
    if (shown.length === 0) {
      list.innerHTML = `<p class="rel-state">${esc(t(`rel.soon.${tab}`))}</p>`;
      return;
    }
    const parsed = shown.map((r) => notes(r.body));
    // Only say "notes are in Korean" when some release has no section in the page's language.
    const hint = document.documentElement.lang !== "ko" && parsed.some((n) => n.lang === "ko") ? t("rel.notesLang") : "";
    list.innerHTML = (hint ? `<p class="rel-hint">${esc(hint)}</p>` : "") + shown.map((r, i) => {
      const exe = r.assets.find((a) => INSTALLER[tab].test(a.name));
      const { items } = parsed[i];
      const badge = (type) => (type === "feat" ? `<b class="tag new">${esc(t("rel.feat"))}</b>` : type === "fix" ? `<b class="tag fix">${esc(t("rel.fix"))}</b>` : "");
      return `
        <article class="rel surface${i === 0 ? " latest" : ""}">
          <div class="rel-head">
            <div>
              <h2>v${esc(r.tag_name.slice(prefix.length))}${i === 0 ? ` <span class="pill">${esc(t("rel.latest"))}</span>` : ""}</h2>
              <time datetime="${esc(r.published_at)}">${esc(date(r.published_at))}</time>
            </div>
            ${exe ? `<a class="btn${i === 0 ? "" : " ghost"} small" href="${esc(exe.browser_download_url)}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg>
              ${esc(t("rel.download"))} · ${(exe.size / 1048576).toFixed(1)} MB</a>` : ""}
          </div>
          ${items.length
            ? `<ul>${items.map((n) => `<li>${badge(n.type)}<span>${inline(n.text)}</span></li>`).join("")}</ul>`
            : `<p class="rel-empty">${esc(t("rel.noNotes"))}</p>`}
          ${exe ? `<p class="rel-file">${esc(exe.name)}</p>` : ""}
        </article>`;
    }).join("");
  }

  async function load() {
    releases = null;
    render();
    try {
      const res = await fetch(RELEASES_API, { headers: { Accept: "application/vnd.github+json" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      releases = (await res.json()).filter((r) => !r.draft && !r.prerelease);
    } catch (err) {
      console.warn("release list failed:", err);
      releases = "error";
    }
    render();
  }

  document.addEventListener("langchange", render);
  load();
})();
