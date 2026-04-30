import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import data from "../src/data/hospice-services-overview.json" with { type: "json" };

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

const cache = new Map();
async function uploadPublicImage(webPath) {
  if (!webPath || typeof webPath !== "string") return undefined;
  if (cache.has(webPath)) return cache.get(webPath);
  const rel = webPath.startsWith("/") ? webPath.slice(1) : webPath;
  const full = path.join(root, "public", rel);
  const buf = readFileSync(full);
  const asset = await client.assets.upload("image", buf, { filename: path.basename(full) });
  const img = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  cache.set(webPath, img);
  return img;
}

const withKeys = (items, prefix) =>
  Array.isArray(items) ? items.map((item, i) => ({ ...item, _key: `${prefix}-${i}` })) : items;

async function mapCards(cards, prefix) {
  const out = [];
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const image = await uploadPublicImage(card.image);
    out.push({
      _key: `${prefix}-${i}`,
      title: card.title,
      excerpt: card.excerpt,
      image,
      imageAlt: card.imageAlt,
      badge: card.badge,
      stat: card.stat,
      ctaLabel: card.ctaLabel,
      href: card.href,
    });
  }
  return out;
}

const heroImage = await uploadPublicImage(data.heroImage);
const buildingCards = await mapCards(data.buildingCards ?? [], "building");
const additionalCards = await mapCards(data.additionalCards ?? [], "additional");

await client.createOrReplace({
  _id: "hospiceServicesOverviewPage.main",
  _type: "hospiceServicesOverviewPage",
  pageTitle: data.pageTitle,
  heroImage,
  heroImageAlt: data.heroImageAlt,
  parentNavLabel: data.parentNavLabel,
  parentNavHref: data.parentNavHref,
  heroH1: data.heroH1,
  heroShortDescription: data.heroShortDescription,
  homepageCareCardExcerpt: data.homepageCareCardExcerpt,
  introEyebrow: data.introEyebrow,
  introHeading: data.introHeading,
  introKeyFacts: withKeys(data.introKeyFacts ?? [], "fact"),
  mainIntro1: data.mainIntro1,
  mainIntro2: data.mainIntro2,
  mainIntro3: data.mainIntro3,
  buildingCards,
  additionalHeading: data.additionalHeading,
  additionalIntro: data.additionalIntro,
  additionalCards,
  referralIntro: data.referralIntro,
  referralMid: data.referralMid,
  referralCta: data.referralCta,
  referralCtaHref: data.referralCtaHref,
  referralOutro: data.referralOutro,
});

console.log("Seeded Sanity document: hospiceServicesOverviewPage.main");
