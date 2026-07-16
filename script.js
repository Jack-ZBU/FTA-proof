// Restart controls: native <img> GIF playback can't be paused/resumed from
// script, so "restart" is implemented by reloading the image with a
// cache-busting query string, which restarts the GIF from its first frame.
document.querySelectorAll(".restart-btn").forEach((button) => {
  const figure = button.closest(".gif-figure");
  const container = figure ? figure.querySelector(".gif-container") : null;
  const img = container ? container.querySelector("img") : null;
  if (!img) return;

  const baseSrc = img.getAttribute("src").split("?")[0];

  button.addEventListener("click", () => {
    img.setAttribute("src", `${baseSrc}?restart=${Date.now()}`);
  });
});

// Progressive disclosure for the proof stages.
document.querySelectorAll(".stage-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    const body = document.getElementById(toggle.getAttribute("aria-controls"));
    toggle.setAttribute("aria-expanded", String(!expanded));
    if (body) body.hidden = expanded;
  });
});

const revealAllBtn = document.getElementById("reveal-all-btn");
if (revealAllBtn) {
  revealAllBtn.addEventListener("click", () => {
    const stageToggles = document.querySelectorAll(".stage-toggle");
    const anyCollapsed = Array.from(stageToggles).some(
      (t) => t.getAttribute("aria-expanded") !== "true"
    );

    stageToggles.forEach((toggle) => {
      const body = document.getElementById(toggle.getAttribute("aria-controls"));
      toggle.setAttribute("aria-expanded", String(anyCollapsed));
      if (body) body.hidden = !anyCollapsed;
    });

    revealAllBtn.textContent = anyCollapsed ? "Hide all stages" : "Show all stages";
  });
}

// "Show the mathematical version" expander.
const mathToggleBtn = document.getElementById("math-toggle-btn");
const mathVersion = document.getElementById("math-version");
if (mathToggleBtn && mathVersion) {
  mathToggleBtn.addEventListener("click", () => {
    const expanded = mathToggleBtn.getAttribute("aria-expanded") === "true";
    mathToggleBtn.setAttribute("aria-expanded", String(!expanded));
    mathVersion.hidden = expanded;
    mathToggleBtn.textContent = expanded
      ? "Show the mathematical version"
      : "Hide the mathematical version";
  });
}
