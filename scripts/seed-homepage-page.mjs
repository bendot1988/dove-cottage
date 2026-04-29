import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import homepage from "../src/data/homepage.json" with { type: "json" };

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

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

/** `/images/foo.png` → upload from `public/images/foo.png` */
async function uploadPublicImage(webPath) {
  if (!webPath || typeof webPath !== "string") return undefined;
  const rel = webPath.startsWith("/") ? webPath.slice(1) : webPath;
  const full = path.join(root, "public", rel);
  const buf = readFileSync(full);
  const filename = path.basename(full);
  const asset = await client.assets.upload("image", buf, { filename });
  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
  };
}

const withKeys = (items, prefix) =>
  Array.isArray(items) ? items.map((item, i) => ({ ...item, _key: `${prefix}-${i}` })) : items;

const supportCards = homepage.supportSection?.cards ?? [];
const uploaded = await Promise.all([
  uploadPublicImage(homepage.hero?.backgroundImage),
  uploadPublicImage(homepage.shopsSection?.sunflowerImage),
  uploadPublicImage(homepage.reachSection?.backgroundImage),
  uploadPublicImage(homepage.supportSection?.backgroundFlowerLeft),
  uploadPublicImage(homepage.supportSection?.backgroundFlowerRight),
  ...supportCards.map((c) => uploadPublicImage(c.icon)),
]);

const [heroBg, sunflower, reachBg, flowerLeft, flowerRight, ...cardIcons] = uploaded;

const hero = {
  ...homepage.hero,
  backgroundImage: heroBg,
  ctas: withKeys(homepage.hero?.ctas, "hero-cta"),
};

const rawCards = withKeys(supportCards, "support-card");
const supportSection = {
  ...homepage.supportSection,
  backgroundFlowerLeft: flowerLeft,
  backgroundFlowerRight: flowerRight,
  cards: rawCards.map((card, i) => ({
    ...card,
    icon: cardIcons[i] ?? card.icon,
  })),
};

await client.createOrReplace({
  _id: "homepagePage.main",
  _type: "homepagePage",
  hero,
  careServices: homepage.careServices,
  videoFeature: homepage.videoFeature,
  shopsSection: {
    ...homepage.shopsSection,
    sunflowerImage: sunflower,
  },
  reachSection: {
    backgroundImage: reachBg,
  },
  supportSection,
});

console.log("Seeded Sanity document: homepagePage.main (with uploaded images)");
