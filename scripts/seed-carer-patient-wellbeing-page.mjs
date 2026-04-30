import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import data from "../src/data/carer-patient-wellbeing.json" with { type: "json" };

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

const [heroImage, sectionImage1, sectionImage2] = await Promise.all([
  uploadPublicImage(data.heroImage),
  uploadPublicImage(data.sectionImage1?.src),
  uploadPublicImage(data.sectionImage2?.src),
]);

await client.createOrReplace({
  _id: "carerPatientWellbeingPage.main",
  _type: "carerPatientWellbeingPage",
  pageTitle: data.pageTitle,
  heroImage,
  heroImageAlt: data.heroImageAlt,
  parentNavLabel: data.parentNavLabel,
  parentNavHref: data.parentNavHref,
  heroH1: data.heroH1,
  heroShortDescription: data.heroShortDescription,
  homepageCareCardExcerpt: data.homepageCareCardExcerpt,
  mainIntro1: data.mainIntro1,
  mainIntro2: data.mainIntro2,
  mainIntro3: data.mainIntro3,
  elementsHeading: data.elementsHeading,
  elementsIntro: data.elementsIntro,
  elementBlocks: withKeys(
    (data.elementBlocks ?? []).map((block) => ({
      ...block,
      bullets: withKeys(block.bullets, `block-${block.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-bullet`),
    })),
    "element-block"
  ),
  notMedicalBody: data.notMedicalBody,
  sessionTimesBody: data.sessionTimesBody,
  relatedHeading: data.relatedHeading,
  relatedIntro: data.relatedIntro,
  relatedLinks: withKeys(data.relatedLinks, "related-link"),
  referralIntro: data.referralIntro,
  referralCta: data.referralCta,
  referralCtaHref: data.referralCtaHref,
  referralOutro: data.referralOutro,
  sideFormLinkText: data.sideFormLinkText,
  sideFormHint: data.sideFormHint,
  sectionImage1: { image: sectionImage1, alt: data.sectionImage1?.alt },
  sectionImage2: { image: sectionImage2, alt: data.sectionImage2?.alt },
});

console.log("Seeded Sanity document: carerPatientWellbeingPage.main");
