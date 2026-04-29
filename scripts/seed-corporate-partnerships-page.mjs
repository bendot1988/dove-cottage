import { createClient } from "@sanity/client";
import corporateData from "../src/data/corporate-partnerships.json" with { type: "json" };

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

await client.createOrReplace({
  _id: "corporatePartnershipsPage.main",
  _type: "corporatePartnershipsPage",
  pageTitle: corporateData.pageTitle,
  metaDescription: corporateData.metaDescription,
  heroImage: corporateData.heroImage,
  heroImageAlt: corporateData.heroImageAlt,
  parentNavLabel: corporateData.parentNavLabel,
  parentNavHref: corporateData.parentNavHref,
  heroH1: corporateData.heroH1,
  heroShortDescription: corporateData.heroShortDescription,
  intro: corporateData.intro,
  visionTitle: corporateData.visionTitle,
  visionBody: corporateData.visionBody,
  whatWeDoBody: corporateData.whatWeDoBody,
  missionParagraphs: corporateData.missionParagraphs ?? [],
  ways: corporateData.ways ?? [],
  donations: corporateData.donations ?? [],
  sponsorshipBody: corporateData.sponsorshipBody,
  expectIntro: corporateData.expectIntro,
  ctaBody: corporateData.ctaBody,
});

console.log("Seeded Sanity document: corporatePartnershipsPage.main");
