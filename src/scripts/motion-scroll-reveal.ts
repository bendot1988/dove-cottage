/**
 * Scroll-triggered section reveals for any page wrapped in `.motion-scope`.
 * Documented on /style-guide/ — pair with styles in `src/styles/global.css`.
 */
export function initMotionScrollReveal(rootSelector = ".motion-scope"): void {
  const root = document.querySelector(rootSelector);
  if (!root) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const sections = root.querySelectorAll("section:not(.hero-section)");
  sections.forEach((el) => {
    el.classList.add("reveal-on-scroll");
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
    { rootMargin: "0px 0px -10% 0px", threshold: 0.07 }
  );

  sections.forEach((el) => observer.observe(el));
}
