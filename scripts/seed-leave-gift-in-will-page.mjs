import { createClient } from "@sanity/client";
import data from "../src/data/leave-a-gift-in-your-will.json" with { type: "json" };

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) throw new Error("Missing SANITY_AUTH_TOKEN. Run with: npx sanity exec ... --with-user-token");

const client = createClient({
  projectId: "juhj0d5o",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token,
});

const toTextObjects = (items, keyPrefix) =>
  Array.isArray(items) ? items.map((text, i) => ({ _key: `${keyPrefix}-${i}`, text })) : [];

await client.createOrReplace({
  _id: "leaveGiftInWillPage.main",
  _type: "leaveGiftInWillPage",
  ...data,
  lastingGiftParagraphs: toTextObjects(data.lastingGiftParagraphs, "lasting"),
  legacyParagraphs: toTextObjects(data.legacyParagraphs, "legacy"),
  typesParagraphs: toTextObjects(data.typesParagraphs, "typesp"),
  typesList: toTextObjects(data.typesList, "typesl"),
  whyParagraphs: toTextObjects(data.whyParagraphs, "why"),
  makingParagraphs: toTextObjects(data.makingParagraphs, "making"),
  freeWillParagraphs: toTextObjects(data.freeWillParagraphs, "freewill"),
  codicilsParagraphs: toTextObjects(data.codicilsParagraphs, "codicils"),
});

console.log("Seeded Sanity document: leaveGiftInWillPage.main");
