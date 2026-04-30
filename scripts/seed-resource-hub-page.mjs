import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import data from "../src/data/resource-hub.json" with { type: "json" };

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

await client.createOrReplace({
  _id: "resourceHubPage.main",
  _type: "resourceHubPage",
  pageTitle: data.pageTitle,
  heroImage: { image: heroImage, legacyUrl: data.heroImage },
  heroImageAlt: data.heroImageAlt,
  parentNavLabel: data.parentNavLabel,
  parentNavHref: data.parentNavHref,
  heroH1: data.heroH1,
  heroShortDescription: data.heroShortDescription,
  introHeading: data.introHeading,
  mainIntro1: data.mainIntro1,
  mainIntro2: data.mainIntro2,
  mainIntro3: data.mainIntro3,
  mainIntro4: data.mainIntro4,
  resources: (data.resources ?? []).map((item, i) => ({
    _key: `resource-${i}`,
    title: item.title,
    organisation: item.organisation,
    category: item.category,
    resourceType: item.resourceType,
    url: item.url,
    file: item.file,
    downloadFile: item.downloadFile,
    linkLabel: item.linkLabel,
  })),
  referralIntro: data.referralIntro,
  referralCta: data.referralCta,
  referralCtaHref: data.referralCtaHref,
  referralOutro: data.referralOutro,
});

console.log("Seeded Sanity document: resourceHubPage.main");
