// Points every [data-download] link at the newest installer for the visitor's OS. Windows and macOS are
// released independently (tags windows-vX.Y.Z / macos-vX.Y.Z), so the newest release of the right prefix
// is picked from the list. Release-asset URLs send no CORS header, so the GitHub API is read instead.
// Loaded after i18n.js (both deferred, sharing one global scope), which defines t().

const REPO = "createrman343212/stillness-releases";
const RELEASES_URL = `https://api.github.com/repos/${REPO}/releases?per_page=30`;
const FALLBACK = "releases.html";

// Installer file per OS, and the asset that identifies it in a release.
const OS_ASSET = { windows: /-setup\.exe$/i, macos: /\.dmg$/i };

/** "macos" or "windows" for the visitor; anything that is not a Mac gets the Windows build. */
function visitorOs() {
  const p = navigator.userAgentData?.platform || navigator.platform || navigator.userAgent || "";
  return /mac/i.test(p) ? "macos" : "windows";
}

const os = visitorOs();
document.documentElement.dataset.os = os;
// { status: "loading" | "ready" | "none" | "error", url?, version?, size? } per OS
const found = { windows: { status: "loading" }, macos: { status: "loading" } };

function render() {
  const mine = found[os];
  const off = mine.status === "none";
  document.querySelectorAll("[data-download]").forEach((a) => {
    a.href = mine.status === "ready" ? mine.url : `${FALLBACK}#${os}`;
    a.classList.toggle("is-off", off);
    a.toggleAttribute("aria-disabled", off);
  });
  document.querySelectorAll("[data-releases]").forEach((a) => (a.href = `${FALLBACK}#${os}`));
  document.querySelectorAll("[data-download-label]").forEach((el) => {
    el.textContent = t(off ? `cta.soon.${os}` : `cta.download.${os}`);
  });
  document.querySelectorAll("[data-platform]").forEach((el) => (el.textContent = t(`cta.platform.${os}`)));
  const meta =
    mine.status === "ready" ? t("release.ready", { version: mine.version, size: mine.size })
    : mine.status === "error" ? t("release.error")
    : off ? ""
    : t("release.loading");
  document.querySelectorAll("[data-release-meta]").forEach((el) => {
    el.textContent = meta;
    el.hidden = !meta;
  });
  // A Mac visitor with no macOS build yet still gets a way to the Windows installer.
  const alt = os === "macos" && off && found.windows.status === "ready" ? found.windows : null;
  document.querySelectorAll("[data-alt-download]").forEach((a) => {
    a.hidden = !alt;
    if (alt) {
      a.href = alt.url;
      a.textContent = t("cta.altWindows", { version: alt.version });
    }
  });
}

async function load() {
  try {
    const res = await fetch(RELEASES_URL, { headers: { Accept: "application/vnd.github+json" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const list = (await res.json()).filter((r) => !r.draft && !r.prerelease);
    for (const name of Object.keys(found)) {
      const rel = list.find((r) => r.tag_name.startsWith(`${name}-v`) && r.assets.some((a) => OS_ASSET[name].test(a.name)));
      const asset = rel?.assets.find((a) => OS_ASSET[name].test(a.name));
      found[name] = asset
        ? { status: "ready", url: asset.browser_download_url, version: rel.tag_name.slice(name.length + 2), size: (asset.size / 1048576).toFixed(1) }
        : { status: "none" };
    }
  } catch (err) {
    console.warn("latest release lookup failed:", err);
    for (const name of Object.keys(found)) found[name] = { status: "error" };
  }
  render();
}

document.addEventListener("langchange", render);
render();
load();
