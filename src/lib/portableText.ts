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

import { resolveSanityImageUrl } from "./sanity";

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export const portableTextToHtml = (
  blocks: Array<PortableTextBlock | PortableTextImageBlock> | undefined,
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

      if (block?._type !== "block") return "";
      const text = (block.children ?? [])
        .filter((child) => child?._type === "span")
        .map((child) => child.text ?? "")
        .join("");
      return `<p>${escapeHtml(text)}</p>`;
    })
    .join("");
};
