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

const withKeys = (items, prefix) =>
  Array.isArray(items) ? items.map((item, i) => ({ ...item, _key: `${prefix}-${i}` })) : items;

const hero = {
  ...homepage.hero,
  ctas: withKeys(homepage.hero?.ctas, "hero-cta"),
};

const supportSection = {
  ...homepage.supportSection,
  cards: withKeys(homepage.supportSection?.cards, "support-card"),
};

await client.createOrReplace({
  _id: "homepagePage.main",
  _type: "homepagePage",
  hero,
  careServices: homepage.careServices,
  videoFeature: homepage.videoFeature,
  shopsSection: homepage.shopsSection,
  reachSection: {
    backgroundImage: homepage.reachSection?.backgroundImage,
  },
  supportSection,
});

console.log("Seeded Sanity document: homepagePage.main");
