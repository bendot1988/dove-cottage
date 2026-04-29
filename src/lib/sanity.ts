import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: "juhj0d5o",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
});

const imageBuilder = createImageUrlBuilder(sanityClient);

export const urlForSanityImage = (source: unknown) => imageBuilder.image(source).url();

/** Accepts a Sanity image value, a legacy URL string, or empty — returns a usable `src` / CSS url. */
export function resolveSanityImageUrl(value: unknown, fallback: string): string {
  if (value == null) return fallback;
  if (typeof value === "string" && value.trim() !== "") return value;
  const asset = (value as { asset?: { _ref?: string } | null }).asset;
  if (!asset?._ref) return fallback;
  try {
    const url = urlForSanityImage(value);
    return url || fallback;
  } catch {
    return fallback;
  }
}
