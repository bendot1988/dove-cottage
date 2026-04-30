import { createClient } from "@sanity/client";
import data from "../src/data/our-corporate-partners.json" with { type: "json" };

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) throw new Error("Missing SANITY_AUTH_TOKEN. Run with: npx sanity exec ... --with-user-token");

const client = createClient({
  projectId: "juhj0d5o",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token,
});

const partners = Array.isArray(data.partners)
  ? data.partners.map((partner, i) => ({
      ...partner,
      logo:
        typeof partner.logo === "string"
          ? {
              _type: "object",
              legacyUrl: partner.logo,
            }
          : partner.logo,
      _key: `partner-${i}`,
    }))
  : [];

await client.createOrReplace({
  _id: "ourCorporatePartnersPage.main",
  _type: "ourCorporatePartnersPage",
  ...data,
  partners,
});

console.log("Seeded Sanity document: ourCorporatePartnersPage.main");
