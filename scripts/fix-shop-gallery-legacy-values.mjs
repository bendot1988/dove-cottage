import { createClient } from "@sanity/client";

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) {
  throw new Error("SANITY_AUTH_TOKEN is missing. Run via: npx sanity exec ... --with-user-token");
}

const client = createClient({
  projectId: "juhj0d5o",
  dataset: "production",
  token,
  apiVersion: "2025-01-01",
  useCdn: false,
});

function keyFor(index) {
  return `legacy-${index}-${Math.random().toString(36).slice(2, 10)}`;
}

const shops = await client.fetch(`*[_type == "shop"]{_id, title, gallery}`);

let updated = 0;
for (const shop of shops) {
  if (!Array.isArray(shop.gallery) || shop.gallery.length === 0) continue;

  let changed = false;
  const nextGallery = shop.gallery.map((item, index) => {
    if (typeof item === "string") {
      changed = true;
      return {
        _type: "legacyGalleryUrl",
        _key: keyFor(index),
        url: item,
      };
    }
    return item;
  });

  if (!changed) continue;

  await client.patch(shop._id).set({ gallery: nextGallery }).commit();
  updated += 1;
  console.log(`Updated ${shop.title || shop._id}`);
}

console.log(`Done. Updated ${updated} shop document(s).`);
