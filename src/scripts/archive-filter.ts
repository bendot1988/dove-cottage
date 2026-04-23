/**
 * Client-side filter for /explore/ archive. Syncs `?topic=` query for sharing deep links.
 */
const TOPIC_PARAM = "topic";

function parseFilterIds(raw: string | null | undefined): string[] {
  return (raw || "")
    .split(/\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function initArchiveFilter(root: HTMLElement | Document = document): void {
  const container =
    root instanceof Document
      ? root.getElementById("archive-explore")
      : root.id === "archive-explore"
        ? root
        : null;
  if (!container) {
    return;
  }

  const buttons = () =>
    Array.from(container.querySelectorAll<HTMLButtonElement>("[data-archive-filter]"));
  const items = () => Array.from(container.querySelectorAll<HTMLElement>("[data-archive-item]"));
  const allId = "all";

  const apply = (filterId: string) => {
    for (const el of items()) {
      const tag = el.getAttribute("data-filters");
      const keys = parseFilterIds(tag);
      const show = filterId === allId || keys.includes(filterId);
      el.toggleAttribute("hidden", !show);
    }

    for (const b of buttons()) {
      const id = b.dataset.archiveFilter;
      if (!id) continue;
      const isSel = id === filterId;
      b.setAttribute("aria-pressed", isSel ? "true" : "false");
      b.classList.toggle("is-active", isSel);
    }

    if (typeof window === "undefined" || !window.location) {
      return;
    }
    const url = new URL(window.location.href);
    if (filterId === allId) {
      url.searchParams.delete(TOPIC_PARAM);
    } else {
      url.searchParams.set(TOPIC_PARAM, filterId);
    }
    window.history.replaceState({}, "", url.toString());
  };

  const fromUrl = () => {
    const p = new URLSearchParams(window.location.search).get(TOPIC_PARAM);
    const valid = (id: string | null) => {
      if (!id) return allId;
      if (id === allId) return allId;
      return buttons().some((b) => b.dataset.archiveFilter === id) ? id : allId;
    };
    return valid(p);
  };

  apply(fromUrl());

  for (const b of buttons()) {
    b.addEventListener("click", () => {
      const id = b.dataset.archiveFilter;
      if (id) {
        apply(id);
      }
    });
  }
}
