/**
 * Home-page style headings: major words capitalized, common articles/prepositions
 * stay lowercase in the middle (roughly AP / Chicago). First and last word are always
 * given initial caps. Body copy should not use this — only headings and short labels.
 */
const SMALL = new Set(
  "a an the and or but nor as at by for from in into of on onto to with per via vs v en is it if us we".split(" ")
);

export function toTitleCase(input: string): string {
  const s = input.trim();
  if (!s) return input;

  return s
    .split(/\s+/)
    .map((word, i, arr) => {
      if (word.length === 0) return word;
      if (/^[\d#]+$/.test(word) || /^\d/.test(word)) {
        return word;
      }
      const lower = word.toLowerCase();
      if (i > 0 && i < arr.length - 1 && SMALL.has(lower)) {
        return lower;
      }
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

const ACRONYM_LOWER = new Map<string, string>([
  ["csr", "CSR"],
  ["uk", "UK"],
  ["eu", "EU"],
]);

/**
 * Capitalises the first letter of every alphabetic run (each “word”), lowercasing the rest.
 * Use for display labels where small words should not stay lowercase. Preserves a few acronyms.
 */
export function toEachWordCapitalized(input: string): string {
  const s = input.trim();
  if (!s) return input;

  let out = s.replace(/[a-z]+/gi, (word) => {
    const lower = word.toLowerCase();
    const mapped = ACRONYM_LOWER.get(lower);
    if (mapped) return mapped;
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });

  out = out.replace(/\bCo-Op\b/gi, "Co-op");
  return out;
}
