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

const keyFor = (prefix, index) => `${prefix}-${index}-${Math.random().toString(36).slice(2, 10)}`;

async function fixShops() {
  const shops = await client.fetch(`*[_type == "shop"]{_id, title, shop_main_image, gallery}`);
  let updated = 0;

  for (const shop of shops) {
    let changed = false;
    const patch = {};

    if (typeof shop.shop_main_image === "string") {
      patch.shop_main_image = { legacyUrl: shop.shop_main_image };
      changed = true;
    }

    if (Array.isArray(shop.gallery)) {
      const nextGallery = shop.gallery.map((item, index) => {
        if (typeof item === "string") {
          changed = true;
          return { _type: "legacyGalleryUrl", _key: keyFor("legacy", index), url: item };
        }
        return item;
      });
      patch.gallery = nextGallery;
    }

    if (!changed) continue;

    await client.patch(shop._id).set(patch).commit();
    updated += 1;
    console.log(`Shop updated: ${shop.title || shop._id}`);
  }

  return updated;
}

async function fixNewsletters() {
  const docs = await client.fetch(`*[_type == "newsletterIssue"]{_id, title, file}`);
  let updated = 0;

  for (const doc of docs) {
    if (typeof doc.file !== "string") continue;
    await client.patch(doc._id).set({ file: { legacyUrl: doc.file } }).commit();
    updated += 1;
    console.log(`Newsletter updated: ${doc.title || doc._id}`);
  }

  return updated;
}

async function fixFacilities() {
  const docs = await client.fetch(`*[_type == "ourFacilitiesPage"]{_id, heroImage, gallerySections}`);
  let updated = 0;

  for (const doc of docs) {
    let changed = false;
    const patch = {};

    if (typeof doc.heroImage === "string") {
      patch.heroImage = { legacyUrl: doc.heroImage };
      changed = true;
    }

    if (Array.isArray(doc.gallerySections)) {
      const nextSections = doc.gallerySections.map((section, sectionIndex) => {
        if (!Array.isArray(section?.images)) return section;
        const nextImages = section.images.map((image, imageIndex) => {
          if (typeof image === "string") {
            changed = true;
            return {
              _type: "imageItem",
              _key: keyFor(`img-${sectionIndex}`, imageIndex),
              legacyUrl: image,
              alt: "",
            };
          }
          if (image && typeof image === "object" && typeof image.src === "string") {
            changed = true;
            const { src, ...rest } = image;
            return { ...rest, legacyUrl: src };
          }
          return image;
        });
        return { ...section, images: nextImages };
      });
      patch.gallerySections = nextSections;
    }

    if (!changed) continue;

    await client.patch(doc._id).set(patch).commit();
    updated += 1;
    console.log(`Facilities page updated: ${doc._id}`);
  }

  return updated;
}

const shopCount = await fixShops();
const newsletterCount = await fixNewsletters();
const facilitiesCount = await fixFacilities();

console.log(
  `Done. Updated ${shopCount} shop doc(s), ${newsletterCount} newsletter doc(s), ${facilitiesCount} facilities page doc(s).`,
);
