// Scripted capture demos for [data-demo], rotating forever:
//   text: Ctrl+Alt+T → drag over a table → shutter → OCR sweep → Markdown on the clipboard → toast
//   web:  freeze → full-screen drag → shutter → mosaic / marker / box / text in place → toast
//   code: freeze → drag-select → shutter → zoom → marker / arrow / mosaic → toast
// Coordinates are measured from the live layout each cycle, so it follows the scene's responsive size.
(() => {
  const scene = document.querySelector("[data-demo]");
  if (!scene) return;
  const $ = (s) => scene.querySelector(s);
  const sel = $(".sel"), size = $(".size"), dim = $(".dim"), shot = $(".shot"), ann = $(".ann");
  const bar = $(".toolbar"), key = $(".key"), toast = $(".toast"), cursor = $(".cursor");
  const shutter = $(".shutter"), flash = $(".flash"), ripple = $(".ripple");
  const scan = $(".scan"), clip = $(".clip"), clipText = $(".clip pre");
  const dots = [...document.querySelectorAll(".scene-dots i")];
  const screens = { code: $('[data-screen="code"]'), web: $('[data-screen="web"]'), text: $('[data-screen="text"]') };
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const inOut = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
  const out = (p) => 1 - Math.pow(1 - p, 3);
  const sleep = (ms) => new Promise((r) => setTimeout(r, reduced ? 0 : ms));

  function tween(ms, fn, ease = inOut) {
    if (reduced) { fn(1); return Promise.resolve(); }
    return new Promise((done) => {
      const t0 = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - t0) / ms);
        fn(ease(p));
        p < 1 ? requestAnimationFrame(step) : done();
      };
      requestAnimationFrame(step);
    });
  }
  function fade(el, to, ms = 250) {
    const from = +getComputedStyle(el).opacity;
    return tween(ms, (p) => (el.style.opacity = from + (to - from) * p));
  }
  const play = (el, frames, ms) => (reduced ? Promise.resolve() : el.animate(frames, { duration: ms, easing: "ease-out" }).finished);

  // Element box in scene coordinates (includes any transform, e.g. the zoomed shot).
  function box(el) {
    // Absolute children are placed from the padding edge, so skip the scene's border
    const s = scene.getBoundingClientRect(), r = el.getBoundingClientRect();
    return { x: r.left - s.left - scene.clientLeft, y: r.top - s.top - scene.clientTop, w: r.width, h: r.height };
  }
  const center = (b) => ({ x: b.x + b.w / 2, y: b.y + b.h / 2 });
  function make(tag, cls, parent, style = {}) {
    const el = document.createElement(tag);
    el.className = cls;
    Object.assign(el.style, style);
    parent.append(el);
    return el;
  }
  const px = (b) => ({ left: `${b.x}px`, top: `${b.y}px`, width: `${b.w}px`, height: `${b.h}px` });

  // Position and press-scale share one inline transform; a separate WAAPI scale animation
  // on the cursor let the compositor briefly draw it at a stale position.
  let cur = { x: 0, y: 0 };
  let press = 1;
  function placeCursor(x, y) {
    cur = { x, y };
    cursor.style.transform = `translate(${x}px, ${y}px) scale(${press})`;
  }
  function move(x, y, ms) {
    const from = { ...cur };
    const d = Math.hypot(x - from.x, y - from.y);
    return tween(ms ?? Math.min(850, 280 + d * 1.3), (p) => placeCursor(from.x + (x - from.x) * p, from.y + (y - from.y) * p));
  }
  function click() {
    ripple.style.left = `${cur.x}px`;
    ripple.style.top = `${cur.y}px`;
    play(ripple, [{ opacity: 0.9, transform: "scale(.4)" }, { opacity: 0, transform: "scale(1.5)" }], 420);
    return tween(180, (p) => {
      press = p >= 1 ? 1 : 1 - 0.18 * Math.sin(Math.PI * p);
      placeCursor(cur.x, cur.y);
    }, (p) => p);
  }
  function shutterFlash() {
    play(flash, [{ opacity: 0 }, { opacity: 0.3 }, { opacity: 0 }], 260);
    return play(shutter, [
      { opacity: 0 }, { opacity: 1, offset: 0.2 }, { opacity: 0.15, offset: 0.45 }, { opacity: 1, offset: 0.65 }, { opacity: 0 },
    ], 520);
  }
  async function pick(name) {
    const t = bar.querySelector(`[data-tool="${name}"]`);
    const c = center(box(t));
    await move(c.x + 2, c.y + 2);
    await click();
    bar.querySelectorAll("[data-tool]").forEach((i) => i.classList.toggle("on", i === t));
    await sleep(140);
  }

  function reset() {
    for (const el of [sel, dim, shot, bar, key, toast, cursor, scan, clip]) el.style.opacity = 0;
    sel.classList.add("empty");
    sel.style.width = sel.style.height = "0px";
    size.textContent = "";
    shot.replaceChildren();
    shot.style.transform = "";
    ann.replaceChildren();
    ann.style.opacity = 1;
    bar.querySelectorAll("[data-tool]").forEach((i) => i.classList.remove("on"));
    cursor.classList.remove("cross");
  }

  async function show(name) {
    await Promise.all(Object.entries(screens).map(([n, el]) => fade(el, n === name ? 1 : 0, 450)));
  }

  // Pointer drifts in and the shortcut freezes the screen; the selection starts at `at`.
  async function freeze(W, H, at, keyLabel = "PrtSc") {
    key.querySelector("kbd").textContent = keyLabel;
    placeCursor(W * 0.84, H * 0.92);
    await fade(cursor, 1, 200);
    await move(W * 0.55, H * 0.5);
    key.style.opacity = 1;
    play(key, [{ opacity: 0, scale: ".8" }, { opacity: 1, scale: "1" }], 200);
    await sleep(350);
    sel.style.left = `${at.x}px`;
    sel.style.top = `${at.y}px`;
    await fade(sel, 1, 220);
    cursor.classList.add("cross");
    await sleep(250);
    fade(key, 0, 200);
  }

  async function drag(r, label, ms) {
    await move(r.x, r.y);
    await sleep(140);
    sel.classList.remove("empty");
    await tween(ms, (p) => {
      const w = r.w * p, h = r.h * p;
      sel.style.width = `${w}px`;
      sel.style.height = `${h}px`;
      size.textContent = label(w, h);
      placeCursor(r.x + w, r.y + h);
    });
    await sleep(120);
  }

  // Confirm with ✓, flash again, show the result toast; resolves after the hold and fade-out.
  async function finish(text) {
    await pick("done");
    toast.querySelector("span").textContent = text;
    fade(cursor, 0, 200);
    fade(bar, 0, 200);
    await shutterFlash();
    toast.style.opacity = 1;
    await play(toast, [{ opacity: 0, translate: "0 10px" }, { opacity: 1, translate: "0 0" }], 300);
    if (reduced) return;
    await sleep(2800);
    await Promise.all([shot, dim, toast, sel, ann].map((el) => fade(el, 0, 400)));
  }

  async function codeDemo() {
    reset();
    bar.style.top = "42px";
    bar.style.bottom = "auto";
    toast.style.top = "auto";
    toast.style.bottom = "14px";
    const root = screens.code, code = root.querySelector(".code");
    const W = scene.clientWidth, H = scene.clientHeight;
    const picks = [...code.querySelectorAll("[data-pick] > span")].map(box);
    const lineH = picks[1].y - picks[0].y;
    const pad = Math.max(6, W * 0.012);
    const r = { x: Math.min(...picks.map((b) => b.x)) - pad, y: picks[0].y - pad * 0.6 };
    r.w = Math.max(...picks.map((b) => b.x + b.w)) + pad * 3 - r.x;
    r.h = picks[2].y + picks[2].h + lineH * 0.9 - r.y;
    // Pretend the scene is a 4K screen region: the finished selection reads 1280 px wide.
    const scaleF = 1280 / r.w;
    const phys = (w, h) => [Math.round(w * scaleF), Math.round(h * scaleF)];

    await freeze(W, H, r);
    await drag(r, (w, h) => phys(w, h).join(" × "), 1000);

    // Shutter, then the crop zooms into the editor.
    await shutterFlash();
    const cb = box(code);
    const clone = code.cloneNode(true);
    clone.style.cssText = `position:absolute;left:${cb.x - r.x}px;top:${cb.y - r.y}px;width:${cb.w}px;margin:0`;
    Object.assign(shot.style, px(r));
    const top = bar.offsetTop + bar.offsetHeight + 12;
    const availH = H - top - 64;
    const k = Math.min((W * 0.9) / r.w, availH / r.h, 2.4);
    const tx = (W - r.w * k) / 2 - r.x;
    const ty = top + Math.max(0, (availH - r.h * k) / 2) - r.y;
    shot.style.setProperty("--k", k);

    // Annotations live in the shot's unscaled local coordinates and scale with it.
    const local = (el) => { const b = box(el); return { x: b.x - r.x, y: b.y - r.y, w: b.w, h: b.h }; };
    const err = { x: picks[0].x - r.x, y: picks[0].y - r.y, w: picks[0].w, h: picks[0].h };
    const mz = local(code.querySelector("[data-mosaic]"));
    const f32 = local(code.querySelector("[data-arrow-to]"));
    const mk = { x: err.x + err.w + 20 / k, y: err.y + err.h / 2 };
    const head = { x: f32.x + f32.w * 0.35, y: f32.y + f32.h + 2 / k };
    const tail = { x: head.x - r.w * 0.16, y: Math.min(r.h - 6 / k, head.y + lineH * 0.75) };

    shot.append(clone);
    const mosaic = make("div", "ann-mosaic", shot, px({ x: mz.x - 2, y: mz.y - 1, w: mz.w + 4, h: mz.h + 2 }));
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "ann-arrow");
    svg.setAttribute("stroke-width", 2.6 / k);
    svg.innerHTML = "<line/><path/>";
    shot.append(svg);
    const marker = make("div", "ann-marker", shot, { left: `${mk.x}px`, top: `${mk.y}px` });
    marker.textContent = "1";

    function drawArrow(a, b) {
      const line = svg.querySelector("line"), tip = svg.querySelector("path");
      line.setAttribute("x1", a.x); line.setAttribute("y1", a.y);
      line.setAttribute("x2", b.x); line.setAttribute("y2", b.y);
      const ang = Math.atan2(b.y - a.y, b.x - a.x), L = 9 / k;
      tip.setAttribute("d", `M${b.x - L * Math.cos(ang - 0.5)} ${b.y - L * Math.sin(ang - 0.5)}L${b.x} ${b.y}L${b.x - L * Math.cos(ang + 0.5)} ${b.y - L * Math.sin(ang + 0.5)}`);
    }

    shot.style.opacity = 1;
    fade(sel, 0, 300);
    fade(dim, 1, 300);
    await tween(650, (p) => (shot.style.transform = `translate(${tx * p}px, ${ty * p}px) scale(${1 + (k - 1) * p})`), out);
    cursor.classList.remove("cross");
    await fade(bar, 1, 220);
    const vis = (pt) => ({ x: r.x + tx + pt.x * k, y: r.y + ty + pt.y * k });

    // Marker on the error line.
    await pick("marker");
    let p = vis(mk);
    await move(p.x, p.y);
    await click();
    marker.style.transform = "scale(1)";
    play(marker, [{ transform: "scale(0)" }, { transform: "scale(1.25)" }, { transform: "scale(1)" }], 320);
    await sleep(350);

    // Arrow pointing at the wrong type.
    await pick("arrow");
    p = vis(tail);
    await move(p.x, p.y);
    await sleep(100);
    await tween(650, (q) => {
      const b = { x: tail.x + (head.x - tail.x) * q, y: tail.y + (head.y - tail.y) * q };
      drawArrow(tail, b);
      const v = vis(b);
      placeCursor(v.x, v.y);
    });
    await sleep(250);

    // Mosaic over the file path.
    await pick("mosaic");
    const my = mz.y + mz.h / 2;
    p = vis({ x: mz.x - 2, y: my });
    await move(p.x, p.y);
    await sleep(100);
    await tween(800, (q) => {
      mosaic.style.clipPath = `inset(0 ${100 - 100 * q}% 0 0)`;
      const v = vis({ x: mz.x - 2 + (mz.w + 4) * q, y: my });
      placeCursor(v.x, v.y);
    });
    await sleep(250);

    const [pw, ph] = phys(r.w, r.h);
    await finish(`${pw}×${ph} · PNG · ${Math.round((pw * ph) / 10000)} KB`);
  }

  async function webDemo() {
    reset();
    // Toolbar and toast sit over the site's nav bar so they never cover the annotated form.
    bar.style.top = toast.style.top = "40px";
    bar.style.bottom = toast.style.bottom = "auto";
    const root = screens.web;
    const W = scene.clientWidth, H = scene.clientHeight;
    const m = 3;
    const r = { x: m, y: m, w: W - 2 * m, h: H - 2 * m };

    // Full-screen capture: corner-to-corner drag over a 4K monitor.
    await freeze(W, H, r);
    await drag(r, (w, h) => `${Math.round((w / r.w) * 3840)} × ${Math.round((h / r.h) * 2160)}`, 1100);
    await shutterFlash();
    cursor.classList.remove("cross");
    await fade(bar, 1, 220);

    // Mosaic over the email address.
    await pick("mosaic");
    const em = box(root.querySelector("[data-mosaic]"));
    const mb = { x: em.x - 3, y: em.y - 2, w: em.w + 6, h: em.h + 4 };
    const mosaic = make("div", "ann-mosaic", ann, px(mb));
    const my = mb.y + mb.h / 2;
    await move(mb.x, my);
    await sleep(100);
    await tween(800, (q) => {
      mosaic.style.clipPath = `inset(0 ${100 - 100 * q}% 0 0)`;
      placeCursor(mb.x + mb.w * q, my);
    });
    await sleep(250);

    // Marker on the password error.
    await pick("marker");
    const er = box(root.querySelector("[data-marker-at]"));
    const mk = { x: er.x + er.w + 14, y: er.y + er.h / 2 };
    await move(mk.x, mk.y);
    await click();
    const marker = make("div", "ann-marker", ann, { left: `${mk.x}px`, top: `${mk.y}px`, transform: "scale(1)" });
    marker.textContent = "1";
    play(marker, [{ transform: "scale(0)" }, { transform: "scale(1.25)" }, { transform: "scale(1)" }], 320);
    await sleep(350);

    // Box around the disabled button.
    await pick("box");
    const bt = box(root.querySelector("[data-box]"));
    const pad = 5;
    const bb = { x: bt.x - pad, y: bt.y - pad, w: bt.w + pad * 2, h: bt.h + pad * 2 };
    await move(bb.x, bb.y);
    await sleep(100);
    const frame = make("div", "ann-box", ann, { left: `${bb.x}px`, top: `${bb.y}px`, width: "0px", height: "0px" });
    await tween(600, (q) => {
      frame.style.width = `${bb.w * q}px`;
      frame.style.height = `${bb.h * q}px`;
      placeCursor(bb.x + bb.w * q, bb.y + bb.h * q);
    });
    await sleep(250);

    // Typed note next to the box.
    await pick("text");
    const at = { x: bb.x + bb.w + 12, y: bb.y + bb.h / 2 };
    await move(at.x, at.y);
    await click();
    const note = make("div", "ann-text typing", ann, { left: `${at.x}px`, top: `${at.y}px` });
    for (const ch of "Why disabled?") {
      note.textContent += ch;
      await sleep(70);
    }
    await sleep(300);
    note.classList.remove("typing");

    await finish("3840×2160 → 2576×1449 · PNG · 305 KB");
  }

  // Text mode (Ctrl+Alt+T): no editing step, the OCR result lands on the clipboard as Markdown.
  const OCR_MD = [
    "| Region | Q2    | Q3    | Change |",
    "|---|---|---|---|",
    "| Korea  | 1,240 | 1,512 | +21.9% |",
    "| Japan  | 980   | 1,105 | +12.8% |",
    "| US     | 2,310 | 2,264 | -2.0%  |",
  ];

  async function textDemo() {
    reset();
    toast.style.top = "auto";
    toast.style.bottom = "14px";
    const root = screens.text;
    const W = scene.clientWidth, H = scene.clientHeight;
    const tb = box(root.querySelector("[data-ocr]"));
    const pad = 6;
    const r = { x: tb.x - pad, y: tb.y - pad, w: tb.w + pad * 2, h: tb.h + pad * 2 };
    const scaleF = 3840 / W;

    await freeze(W, H, r, "Ctrl + Alt + T");
    await drag(r, (w, h) => `${Math.round(w * scaleF)} × ${Math.round(h * scaleF)}`, 900);
    fade(cursor, 0, 200);
    await shutterFlash();

    // Recognition sweep over the selection.
    Object.assign(scan.style, { left: `${r.x}px`, top: `${r.y}px`, width: `${r.w}px`, height: "0px", opacity: 1 });
    await tween(950, (p) => (scan.style.height = `${r.h * p}px`), (p) => p);
    fade(scan, 0, 250);
    fade(sel, 0, 300);
    fade(dim, 1, 300);

    clipText.textContent = "";
    clip.style.opacity = 1;
    play(clip, [{ opacity: 0, translate: "-50% -44%" }, { opacity: 1, translate: "-50% -50%" }], 300);
    await sleep(250);
    for (const [i, line] of OCR_MD.entries()) {
      clipText.textContent += (i ? "\n" : "") + line;
      await sleep(170);
    }
    await sleep(250);

    const chars = OCR_MD.join("").replace(/\s/g, "").length;
    toast.querySelector("span").textContent = t("demo.textToast", { lines: OCR_MD.length, chars });
    toast.style.opacity = 1;
    await play(toast, [{ opacity: 0, translate: "0 10px" }, { opacity: 1, translate: "0 0" }], 300);
    if (reduced) return;
    await sleep(3000);
    await Promise.all([clip, dim, toast].map((el) => fade(el, 0, 400)));
  }

  let visible = true;
  new IntersectionObserver((e) => (visible = e[0].isIntersecting)).observe(scene);
  const waitVisible = async () => {
    while (!visible || document.hidden) await new Promise((r) => setTimeout(r, 400));
  };

  (async () => {
    await document.fonts.ready;
    if (reduced) return webDemo();
    const demos = [["web", webDemo], ["code", codeDemo], ["text", textDemo]];
    for (let i = 0; ; i++) {
      await waitVisible();
      const [name, run] = demos[i % demos.length];
      dots.forEach((d, j) => d.classList.toggle("on", j === i % demos.length));
      await show(name);
      await run();
      await sleep(300);
    }
  })();
})();
