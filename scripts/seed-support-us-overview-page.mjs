import { createClient } from "@sanity/client";
import data from "../src/data/support-us-overview.json" with { type: "json" };

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) throw new Error("Missing SANITY_AUTH_TOKEN. Run with: npx sanity exec ... --with-user-token");

const client = createClient({
  projectId: "juhj0d5o",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token,
});

const cards = Array.isArray(data.cards) ? data.cards.map((item, i) => ({ ...item, _key: `card-${i}` })) : [];

await client.createOrReplace({
  _id: "supportUsOverviewPage.main",
  _type: "supportUsOverviewPage",
  ...data,
  cards,
});

console.log("Seeded Sanity document: supportUsOverviewPage.main");
