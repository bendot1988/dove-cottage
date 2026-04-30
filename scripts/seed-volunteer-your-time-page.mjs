import { createClient } from "@sanity/client";
import data from "../src/data/volunteer-your-time.json" with { type: "json" };

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) throw new Error("Missing SANITY_AUTH_TOKEN. Run with: npx sanity exec ... --with-user-token");

const client = createClient({
  projectId: "juhj0d5o",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token,
});

const withKeys = (items, prefix) =>
  Array.isArray(items) ? items.map((item, i) => ({ ...item, _key: `${prefix}-${i}` })) : [];

await client.createOrReplace({
  _id: "volunteerYourTimePage.main",
  _type: "volunteerYourTimePage",
  ...data,
  roles: withKeys(data.roles, "role"),
});

console.log("Seeded Sanity document: volunteerYourTimePage.main");
