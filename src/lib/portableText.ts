type PortableTextSpan = {
  _type: "span";
  text?: string;
};

type PortableTextBlock = {
  _type: "block";
  children?: PortableTextSpan[];
};

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

export const portableTextToHtml = (blocks: PortableTextBlock[] | undefined) => {
  if (!Array.isArray(blocks) || blocks.length === 0) return "";

  return blocks
    .filter((block) => block?._type === "block")
    .map((block) => {
      const text = (block.children ?? [])
        .filter((child) => child?._type === "span")
        .map((child) => child.text ?? "")
        .join("");
      return `<p>${escapeHtml(text)}</p>`;
    })
    .join("");
};
