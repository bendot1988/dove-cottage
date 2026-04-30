import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import data from "../src/data/bereavement-support-group.json" with { type: "json" };

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

async function uploadPublicImage(webPath) {
  if (!webPath || typeof webPath !== "string") return undefined;
  const rel = webPath.startsWith("/") ? webPath.slice(1) : webPath;
  const full = path.join(root, "public", rel);
  const buf = readFileSync(full);
  const asset = await client.assets.upload("image", buf, { filename: path.basename(full) });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

const heroImage = await uploadPublicImage(data.heroImage);
const sectionImage = await uploadPublicImage(data.sectionImage1?.src);

const withKeys = (items, prefix) =>
  Array.isArray(items) ? items.map((item, i) => ({ ...item, _key: `${prefix}-${i}` })) : items;

await client.createOrReplace({
  _id: "bereavementSupportGroupPage.main",
  _type: "bereavementSupportGroupPage",
  pageTitle: data.pageTitle,
  heroImage,
  heroImageAlt: data.heroImageAlt,
  parentNavLabel: data.parentNavLabel,
  parentNavHref: data.parentNavHref,
  heroH1: data.heroH1,
  heroShortDescription: data.heroShortDescription,
  mainIntro1: data.mainIntro1,
  mainIntro2: data.mainIntro2,
  mainIntro3: data.mainIntro3,
  groupHeading: data.groupHeading,
  groupBullets: withKeys(data.groupBullets, "group-bullet"),
  detailsFoot: data.detailsFoot,
  registerInterestIntro: data.registerInterestIntro,
  registerInterestCta: data.registerInterestCta,
  registerInterestHref: data.registerInterestHref,
  registerInterestOutro: data.registerInterestOutro,
  sideFormLinkText: data.sideFormLinkText,
  sideFormHint: data.sideFormHint,
  sectionImage1: {
    image: sectionImage,
    alt: data.sectionImage1?.alt,
  },
  beaconAccount: data.beaconAccount,
  beaconFormId: data.beaconFormId,
});

console.log("Seeded Sanity document: bereavementSupportGroupPage.main");
