import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import data from "../src/data/support-groups.json" with { type: "json" };

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

const heroImage = await uploadPublicImage(data.heroImage);
const cardImages = await Promise.all((data.cards ?? []).map((card) => uploadPublicImage(card.image)));

await client.createOrReplace({
  _id: "supportGroupsPage.main",
  _type: "supportGroupsPage",
  pageTitle: data.pageTitle,
  heroImage: { image: heroImage, legacyUrl: data.heroImage },
  heroImageAlt: data.heroImageAlt,
  parentNavLabel: data.parentNavLabel,
  parentNavHref: data.parentNavHref,
  heroH1: data.heroH1,
  heroShortDescription: data.heroShortDescription,
  mainIntro1: data.mainIntro1,
  cards: (data.cards ?? []).map((card, i) => ({
    _key: `support-card-${i}`,
    title: card.title,
    excerpt: card.excerpt,
    image: { image: cardImages[i], legacyUrl: card.image },
    imageAlt: card.imageAlt,
    badge: card.badge,
    stat: card.stat,
    ctaLabel: card.ctaLabel,
    href: card.href,
  })),
  referralIntro: data.referralIntro,
  referralCta: data.referralCta,
  referralCtaHref: data.referralCtaHref,
  referralOutro: data.referralOutro,
});

console.log("Seeded Sanity document: supportGroupsPage.main");
