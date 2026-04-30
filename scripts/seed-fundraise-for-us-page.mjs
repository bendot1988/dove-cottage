import { createClient } from "@sanity/client";
import data from "../src/data/fundraise-for-us.json" with { type: "json" };

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) throw new Error("Missing SANITY_AUTH_TOKEN. Run with: npx sanity exec ... --with-user-token");

const client = createClient({
  projectId: "juhj0d5o",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token,
});

await client.createOrReplace({
  _id: "fundraiseForUsPage.main",
  _type: "fundraiseForUsPage",
  ...data,
});

console.log("Seeded Sanity document: fundraiseForUsPage.main");
