import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import data from "../src/data/therapy-bathing.json" with { type: "json" };

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

const withKeys = (items, prefix) =>
  Array.isArray(items) ? items.map((item, i) => ({ ...item, _key: `${prefix}-${i}` })) : items;

const [heroImage, sectionImg] = await Promise.all([
  uploadPublicImage(data.heroImage),
  uploadPublicImage(data.sectionImage1?.src),
]);

await client.createOrReplace({
  _id: "therapyBathingPage.main",
  _type: "therapyBathingPage",
  pageTitle: data.pageTitle,
  heroImage,
  heroImageAlt: data.heroImageAlt,
  parentNavLabel: data.parentNavLabel,
  parentNavHref: data.parentNavHref,
  heroH1: data.heroH1,
  heroShortDescription: data.heroShortDescription,
  mainIntro1: data.mainIntro1,
  mainIntro2: data.mainIntro2,
  sectionImage1: {
    image: sectionImg,
    alt: data.sectionImage1?.alt,
  },
  activitiesHeading: data.activitiesHeading,
  activitiesList: withKeys(data.activitiesList, "activity"),
  facilitiesBody: data.facilitiesBody,
  referralIntro: data.referralIntro,
  referralCta: data.referralCta,
  referralCtaHref: data.referralCtaHref,
  referralOutro: data.referralOutro,
  sideFormLinkText: data.sideFormLinkText,
  sideFormHint: data.sideFormHint,
});

console.log("Seeded Sanity document: therapyBathingPage.main");
