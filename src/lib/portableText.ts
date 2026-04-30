type PortableTextSpan = {
  _type: "span";
  text?: string;
};

type PortableTextBlock = {
  _type: "block";
  children?: PortableTextSpan[];
};

type PortableTextImageBlock = {
  _type: "image";
  alt?: string;
  caption?: string;
  asset?: { _ref?: string };
};

type PortableTextGalleryImage = {
  _type: "image";
  alt?: string;
  caption?: string;
  asset?: { _ref?: string };
};

type PortableTextGalleryBlock = {
  _type: "imageGallery";
  title?: string;
  images?: PortableTextGalleryImage[];
};

type PortableTextYoutubeBlock = {
  _type: "youtubeEmbed";
  url?: string;
  title?: string;
};

import { resolveSanityImageUrl } from "./sanity";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export const portableTextToHtml = (
  blocks: Array<PortableTextBlock | PortableTextImageBlock | PortableTextGalleryBlock | PortableTextYoutubeBlock> | undefined,
) => {
  if (!Array.isArray(blocks) || blocks.length === 0) return "";

  return blocks
    .map((block) => {
      if (block?._type === "image") {
        const src = resolveSanityImageUrl(block, "");
        if (!src) return "";
        const alt = escapeHtml(block.alt ?? "");
        const caption = block.caption?.trim() ? `<figcaption>${escapeHtml(block.caption)}</figcaption>` : "";
        return `<figure><img src="${src}" alt="${alt}" loading="lazy" />${caption}</figure>`;
      }

      if (block?._type === "imageGallery") {
        const images = (block.images ?? [])
          .map((image) => {
            const src = resolveSanityImageUrl(image, "");
            if (!src) return "";
            const alt = escapeHtml(image.alt ?? "");
            const caption = image.caption?.trim() ? `<figcaption>${escapeHtml(image.caption)}</figcaption>` : "";
            return `<figure class="inline-gallery__item"><img src="${src}" alt="${alt}" loading="lazy" />${caption}</figure>`;
          })
          .filter(Boolean)
          .join("");

        if (!images) return "";
        const title = block.title?.trim()
          ? `<p class="inline-gallery__title">${escapeHtml(block.title)}</p>`
          : "";
        return `<section class="inline-gallery">${title}<div class="inline-gallery__grid">${images}</div></section>`;
      }

      if (block?._type === "youtubeEmbed") {
        const embedUrl = getYoutubeEmbedUrl(block.url ?? "");
        if (!embedUrl) return "";
        const title = escapeHtml(block.title?.trim() || "YouTube video");
        return `<div class="yt-embed"><iframe src="${embedUrl}" title="${title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;
      }

      if (block?._type !== "block") return "";
      const text = (block.children ?? [])
        .filter((child) => child?._type === "span")
        .map((child) => child.text ?? "")
        .join("");
      return `<p>${escapeHtml(text)}</p>`;
    })
    .join("");
};

const getYoutubeEmbedUrl = (value: string) => {
  if (!value) return "";
  try {
    const url = new URL(value);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const videoId = url.pathname.split("/").filter(Boolean)[0];
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : "";
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") {
        const videoId = url.searchParams.get("v");
        return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : "";
      }
      if (url.pathname.startsWith("/embed/")) {
        const videoId = url.pathname.replace("/embed/", "").split("/")[0];
        return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : "";
      }
      if (url.pathname.startsWith("/shorts/")) {
        const videoId = url.pathname.replace("/shorts/", "").split("/")[0];
        return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : "";
      }
    }
  } catch {
    return "";
  }

  return "";
};
