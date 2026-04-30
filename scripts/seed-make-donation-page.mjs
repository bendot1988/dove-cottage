import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import data from "../src/data/donate.json" with { type: "json" };

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) throw new Error("Missing SANITY_AUTH_TOKEN. Run with: npx sanity exec ... --with-user-token");

const client = createClient({
  projectId: "juhj0d5o",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token,
});

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

async function uploadPublicImage(webPath) {
  if (!webPath || typeof webPath !== "string") return undefined;
  const rel = webPath.startsWith("/") ? webPath.slice(1) : webPath;
  const full = path.join(root, "public", rel);
  const buf = readFileSync(full);
  const asset = await client.assets.upload("image", buf, { filename: path.basename(full) });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

const withKeys = (items, prefix) =>
  Array.isArray(items) ? items.map((item, i) => ({ ...item, _key: `${prefix}-${i}` })) : items;

const heroImage = await uploadPublicImage(data.heroImage);

await client.createOrReplace({
  _id: "makeDonationPage.main",
  _type: "makeDonationPage",
  pageTitle: data.pageTitle,
  donateFormSectionTitle: data.donateFormSectionTitle,
  donateFormIntro: data.donateFormIntro,
  beaconAccount: data.beaconAccount,
  beaconDonateFormId: data.beaconDonateFormId,
  heroImage,
  heroImageAlt: data.heroImageAlt,
  allWaysToSupportLabel: data.allWaysToSupportLabel,
  allWaysToSupportHref: data.allWaysToSupportHref,
  heroTitleBefore: data.heroTitleBefore,
  heroTitleHighlight: data.heroTitleHighlight,
  heroDescription: data.heroDescription,
  heroPrimaryCtaLabel: data.heroPrimaryCtaLabel,
  heroPrimaryCtaHref: data.heroPrimaryCtaHref,
  heroSecondaryCtaLabel: data.heroSecondaryCtaLabel,
  heroSecondaryCtaHref: data.heroSecondaryCtaHref,
  aboutEyebrow: data.aboutEyebrow,
  aboutHeading: data.aboutHeading,
  aboutParagraph1: data.aboutParagraph1,
  aboutParagraph2: data.aboutParagraph2,
  impactHeading: data.impactHeading,
  impactLede: data.impactLede,
  impactCards: withKeys(data.impactCards, "impact"),
  suggestedMethodsTitle: data.suggestedMethodsTitle,
  suggestedMethods: withKeys(data.suggestedMethods, "method"),
});

console.log("Seeded Sanity document: makeDonationPage.main");
