import { createClient } from "@sanity/client";

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) {
  throw new Error("Missing SANITY_AUTH_TOKEN. Run with: npx sanity exec ... --with-user-token");
}

const client = createClient({
  projectId: "juhj0d5o",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token,
});

const keyFor = (prefix, index) => `${prefix}-${index}-${Math.random().toString(36).slice(2, 9)}`;

const doc = await client.fetch(`*[_type == "ourFacilitiesPage"][0]{_id, gallerySections}`);
if (!doc?._id) {
  console.log("No ourFacilitiesPage document found.");
  process.exit(0);
}

const nextSections = Array.isArray(doc.gallerySections)
  ? doc.gallerySections.map((section, sectionIndex) => {
      const withSectionKey = section?._key ? section : { ...section, _key: keyFor("section", sectionIndex) };
      const images = Array.isArray(withSectionKey.images)
        ? withSectionKey.images.map((image, imageIndex) =>
            image?._key ? image : { ...image, _key: keyFor(`image-${sectionIndex}`, imageIndex) },
          )
        : withSectionKey.images;
      return { ...withSectionKey, images };
    })
  : [];

await client.patch(doc._id).set({ gallerySections: nextSections }).commit();
console.log(`Fixed missing keys for ${doc._id}`);
