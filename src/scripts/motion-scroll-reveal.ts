/**
 * Subtle load-in animation (not scroll-triggered).
 * Keeps content visible immediately while adding light polish.
 */
export function initMotionScrollReveal(rootSelector = ".motion-scope"): void {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const sections = root.querySelectorAll(
    "section:not(.hero-section):not(.contact-hero):not(.donate-hero):not(.shop-hero):not(.hospice-svc-hero):not(.archive-hero)"
  );

  sections.forEach((el, idx) => {
    const delay = Math.min(idx * 0.045, 0.28);
    el.classList.add("reveal-on-load");
    el.style.setProperty("--motion-load-delay", `${delay}s`);
  });
}
