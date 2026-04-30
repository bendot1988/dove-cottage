import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import data from "../src/data/bereavement-support.json" with { type: "json" };

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
const afterIntro = await uploadPublicImage(data.sectionImages?.afterIntro?.src);
const afterCallout = await uploadPublicImage(data.sectionImages?.afterCallout?.src);
const beforeSupportGroups = await uploadPublicImage(data.sectionImages?.beforeSupportGroups?.src);

const withKeys = (items, prefix) =>
  Array.isArray(items) ? items.map((item, i) => ({ ...item, _key: `${prefix}-${i}` })) : items;

await client.createOrReplace({
  _id: "bereavementSupportPage.main",
  _type: "bereavementSupportPage",
  pageTitle: data.pageTitle,
  heroImage,
  heroImageAlt: data.heroImageAlt,
  parentNavLabel: data.parentNavLabel,
  parentNavHref: data.parentNavHref,
  heroH1: data.heroH1,
  heroShortDescription: data.heroShortDescription,
  mainIntro1: data.mainIntro1,
  mainIntro2: data.mainIntro2,
  whoHeading: data.whoHeading,
  whoList: withKeys(data.whoList, "who"),
  callout: data.callout,
  anticipatoryHeading: data.anticipatoryHeading,
  anticipatoryBody1: data.anticipatoryBody1,
  anticipatoryBody2: data.anticipatoryBody2,
  nurseHeading: data.nurseHeading,
  nurseIntro: data.nurseIntro,
  nurseListIntro: data.nurseListIntro,
  nurseList: withKeys(data.nurseList, "nurse"),
  nurseFoot: data.nurseFoot,
  dropInHeading: data.dropInHeading,
  dropInIntro: data.dropInIntro,
  dropInGroups: withKeys(
    (data.dropInGroups ?? []).map((group) => ({
      ...group,
      bullets: withKeys(group.bullets, `group-${group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-bullet`),
    })),
    "group"
  ),
  dropInFoot: data.dropInFoot,
  counsellingHeading: data.counsellingHeading,
  counsellingBody: data.counsellingBody,
  counsellingCta: data.counsellingCta,
  counsellingCtaHref: data.counsellingCtaHref,
  sideFormLinkText: data.sideFormLinkText,
  sideFormHint: data.sideFormHint,
  sectionImages: {
    afterIntro: {
      image: afterIntro,
      alt: data.sectionImages?.afterIntro?.alt,
    },
    afterCallout: {
      image: afterCallout,
      alt: data.sectionImages?.afterCallout?.alt,
    },
    beforeSupportGroups: {
      image: beforeSupportGroups,
      alt: data.sectionImages?.beforeSupportGroups?.alt,
    },
  },
});

console.log("Seeded Sanity document: bereavementSupportPage.main");
