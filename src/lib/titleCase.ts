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
