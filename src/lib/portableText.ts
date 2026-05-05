type PortableTextSpan = {
  _type: "span";
  text?: string;
  marks?: string[];
};

type PortableTextMarkDef = {
  _key: string;
  _type?: string;
  href?: string;
  blank?: boolean;
  openInNewTab?: boolean;
};

type PortableTextBlock = {
  _type: "block";
  children?: PortableTextSpan[];
  style?: string;
  markDefs?: PortableTextMarkDef[];
};

type PortableTextImageBlock = {
  _type: "image" | "inlineImage" | "galleryImage";
  alt?: string;
  caption?: string;
  asset?: { _ref?: string };
};

type PortableTextGalleryImage = {
  _type: "image" | "inlineImage" | "galleryImage";
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
      if (isImageBlock(block)) {
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
      const text = renderPortableTextChildren(block);
      const tag = getBlockTag(block.style);
      return `<${tag}>${text}</${tag}>`;
    })
    .join("");
};

const getBlockTag = (style?: string) => {
  if (style === "h2" || style === "h3" || style === "h4" || style === "h5") return style;
  return "p";
};

const renderPortableTextChildren = (block: PortableTextBlock) => {
  const markDefByKey = new Map((block.markDefs ?? []).map((def) => [def._key, def]));
  return (block.children ?? [])
    .filter((child) => child?._type === "span")
    .map((child) => {
      const text = escapeHtml(child.text ?? "");
      const marks = child.marks ?? [];
      return marks.reduce((acc, mark) => applyMark(acc, mark, markDefByKey), text);
    })
    .join("");
};

const applyMark = (value: string, mark: string, markDefByKey: Map<string, PortableTextMarkDef>) => {
  if (!value) return value;
  if (mark === "strong") return `<strong>${value}</strong>`;
  if (mark === "em") return `<em>${value}</em>`;
  if (mark === "underline") return `<u>${value}</u>`;
  if (mark === "strike-through") return `<s>${value}</s>`;
  if (mark === "code") return `<code>${value}</code>`;

  const markDef = markDefByKey.get(mark);
  if (!markDef || markDef._type !== "link") return value;

  const href = sanitizeHref(markDef.href ?? "");
  if (!href) return value;

  const opensNewTab = markDef.blank === true || markDef.openInNewTab === true;
  const rel = opensNewTab ? ' rel="noopener noreferrer"' : "";
  const target = opensNewTab ? ' target="_blank"' : "";
  return `<a href="${escapeHtml(href)}"${target}${rel}>${value}</a>`;
};

const sanitizeHref = (href: string) => {
  const value = href.trim();
  if (!value) return "";
  if (value.startsWith("/") || value.startsWith("#")) return value;
  if (/^(https?:|mailto:|tel:)/i.test(value)) return value;
  return "";
};

const isImageBlock = (value: unknown): value is PortableTextImageBlock => {
  if (!value || typeof value !== "object") return false;
  const candidate = value as { _type?: string; asset?: { _ref?: string } };
  const isKnownType = candidate._type === "image" || candidate._type === "inlineImage" || candidate._type === "galleryImage";
  const hasAssetRef = typeof candidate.asset?._ref === "string" && candidate.asset._ref.length > 0;
  return isKnownType || hasAssetRef;
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
