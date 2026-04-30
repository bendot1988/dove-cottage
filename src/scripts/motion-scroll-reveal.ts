/**
 * Scroll-triggered motion without hiding full sections.
 * Sections stay visible; inner elements gently ease in on view.
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

  sections.forEach((el) => {
    el.classList.add("reveal-on-load");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.08 }
  );

  sections.forEach((el) => observer.observe(el));
}
