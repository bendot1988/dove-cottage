import { createClient } from "@sanity/client";

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
  _id: "shopsOverviewPage.main",
  _type: "shopsOverviewPage",
  pageTitle: "Our Shops | Dove Cottage",
  metaDescription: "Find your nearest Dove Cottage charity shop and support local hospice care through every purchase.",
  heroImage: "/images/uploads/shops/shops-featured-asfordby.png",
  heroImageAlt: "Dove Cottage charity shop storefront in Asfordby",
  parentNavLabel: "Support Us",
  parentNavHref: "/support-us/",
  heroH1: "Our Shops",
  heroShortDescription:
    "Visit our charity shops to support Dove Cottage Day Hospice. Every purchase helps us continue to provide free specialist care.",
  introEyebrow: "Find your local shop",
  introHeading: "Visit Us in Person",
  intro:
    "Visit our charity shops to support Dove Cottage Day Hospice. Every purchase helps us continue to provide free specialist care.",
});

console.log("Seeded Sanity document: shopsOverviewPage.main");
