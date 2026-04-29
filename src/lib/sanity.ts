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
