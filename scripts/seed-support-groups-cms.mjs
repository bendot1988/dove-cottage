import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import supportGroups from "../src/data/support-groups.json" with { type: "json" };
import mensShed from "../src/data/mens-shed.json" with { type: "json" };
import bereavementSupportGroup from "../src/data/bereavement-support-group.json" with { type: "json" };
import carerSupportGroup from "../src/data/carer-support.json" with { type: "json" };

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) {
  throw new Error("Missing SANITY_AUTH_TOKEN. Run with: npx sanity exec scripts/seed-support-groups-cms.mjs --with-user-token");
}

const client = createClient({
  projectId: "juhj0d5o",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token,
});

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function asImageSource(url) {
  return {
    image: null,
    legacyUrl: url || "",
  };
}

async function uploadPublicImage(webPath) {
  if (!webPath || typeof webPath !== "string") return undefined;
  const rel = webPath.startsWith("/") ? webPath.slice(1) : webPath;
  const full = path.join(root, "public", rel);
  const buf = readFileSync(full);
  const asset = await client.assets.upload("image", buf, { filename: path.basename(full) });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

function withKeys(items, prefix) {
  return Array.isArray(items)
    ? items.map((item, i) => ({
        ...item,
        _key: `${prefix}-${i}`,
      }))
    : [];
}

await client.createOrReplace({
  _id: "supportGroupsPage.main",
  _type: "supportGroupsPage",
  pageTitle: supportGroups.pageTitle,
  heroImage: asImageSource(supportGroups.heroImage),
  heroImageAlt: supportGroups.heroImageAlt,
  parentNavLabel: supportGroups.parentNavLabel,
  parentNavHref: supportGroups.parentNavHref,
  heroH1: supportGroups.heroH1,
  heroShortDescription: supportGroups.heroShortDescription,
  mainIntro1: supportGroups.mainIntro1,
  cards: (supportGroups.cards || []).map((card, i) => ({
    _key: `support-card-${i}`,
    title: card.title,
    excerpt: card.excerpt,
    image: asImageSource(card.image),
    imageAlt: card.imageAlt,
    badge: card.badge,
    stat: card.stat,
    ctaLabel: card.ctaLabel,
    href: card.href,
  })),
  referralIntro: supportGroups.referralIntro,
  referralCta: supportGroups.referralCta,
  referralCtaHref: supportGroups.referralCtaHref,
  referralOutro: supportGroups.referralOutro,
});

const mensShedHeroImage = await uploadPublicImage(mensShed.heroImage);
await client.createOrReplace({
  _id: "mensShedPage.main",
  _type: "mensShedPage",
  pageTitle: mensShed.pageTitle,
  heroImage: mensShedHeroImage,
  heroImageAlt: mensShed.heroImageAlt,
  parentNavLabel: mensShed.parentNavLabel,
  parentNavHref: mensShed.parentNavHref,
  heroH1: mensShed.heroH1,
  heroShortDescription: mensShed.heroShortDescription,
  whatHeading: mensShed.whatHeading,
  whatBody: mensShed.whatBody,
  whoHeading: mensShed.whoHeading,
  whoList: withKeys(mensShed.whoList, "who"),
  helpHeading: mensShed.helpHeading,
  helpBody: mensShed.helpBody,
  benefitsHeading: mensShed.benefitsHeading,
  benefitsList: withKeys(mensShed.benefitsList, "benefit"),
  attendanceBody: mensShed.attendanceBody,
  locationBody: mensShed.locationBody,
  quoteText: mensShed.quoteText,
  quoteAttribution: mensShed.quoteAttribution,
  referralIntro: mensShed.referralIntro,
  referralCta: mensShed.referralCta,
  referralCtaHref: mensShed.referralCtaHref,
  referralOutro: mensShed.referralOutro,
  sideFormLinkText: mensShed.sideFormLinkText,
  sideFormHint: mensShed.sideFormHint,
});

const bereavementHeroImage = await uploadPublicImage(bereavementSupportGroup.heroImage);
const bereavementSectionImage = await uploadPublicImage(bereavementSupportGroup.sectionImage1?.src);
await client.createOrReplace({
  _id: "bereavementSupportGroupPage.main",
  _type: "bereavementSupportGroupPage",
  pageTitle: bereavementSupportGroup.pageTitle,
  heroImage: bereavementHeroImage,
  heroImageAlt: bereavementSupportGroup.heroImageAlt,
  parentNavLabel: bereavementSupportGroup.parentNavLabel,
  parentNavHref: bereavementSupportGroup.parentNavHref,
  heroH1: bereavementSupportGroup.heroH1,
  heroShortDescription: bereavementSupportGroup.heroShortDescription,
  mainIntro1: bereavementSupportGroup.mainIntro1,
  mainIntro2: bereavementSupportGroup.mainIntro2,
  mainIntro3: bereavementSupportGroup.mainIntro3,
  groupHeading: bereavementSupportGroup.groupHeading,
  groupBullets: withKeys(bereavementSupportGroup.groupBullets, "group-bullet"),
  detailsFoot: bereavementSupportGroup.detailsFoot,
  registerInterestIntro: bereavementSupportGroup.registerInterestIntro,
  registerInterestCta: bereavementSupportGroup.registerInterestCta,
  registerInterestHref: bereavementSupportGroup.registerInterestHref,
  registerInterestOutro: bereavementSupportGroup.registerInterestOutro,
  sideFormLinkText: bereavementSupportGroup.sideFormLinkText,
  sideFormHint: bereavementSupportGroup.sideFormHint,
  sectionImage1: {
    image: bereavementSectionImage,
    alt: bereavementSupportGroup.sectionImage1?.alt,
  },
  beaconAccount: bereavementSupportGroup.beaconAccount,
  beaconFormId: bereavementSupportGroup.beaconFormId,
});

const carerHeroImage = await uploadPublicImage(carerSupportGroup.heroImage);
const carerSectionImage = await uploadPublicImage(carerSupportGroup.sectionImage1?.src);
await client.createOrReplace({
  _id: "carerSupportGroupPage.main",
  _type: "carerSupportGroupPage",
  pageTitle: carerSupportGroup.pageTitle,
  heroImage: carerHeroImage,
  heroImageAlt: carerSupportGroup.heroImageAlt,
  parentNavLabel: carerSupportGroup.parentNavLabel,
  parentNavHref: carerSupportGroup.parentNavHref,
  heroH1: carerSupportGroup.heroH1,
  heroShortDescription: carerSupportGroup.heroShortDescription,
  mainIntro1: carerSupportGroup.mainIntro1,
  mainIntro2: carerSupportGroup.mainIntro2,
  sectionImage1: {
    image: carerSectionImage,
    alt: carerSupportGroup.sectionImage1?.alt,
  },
  whoHeading: carerSupportGroup.whoHeading,
  whoList: withKeys(carerSupportGroup.whoList, "who"),
  helpHeading: carerSupportGroup.helpHeading,
  helpList: withKeys(carerSupportGroup.helpList, "help"),
  detailsFoot: carerSupportGroup.detailsFoot,
  registerInterestIntro: carerSupportGroup.registerInterestIntro,
  registerInterestCta: carerSupportGroup.registerInterestCta,
  registerInterestHref: carerSupportGroup.registerInterestHref,
  registerInterestOutro: carerSupportGroup.registerInterestOutro,
  sideFormLinkText: carerSupportGroup.sideFormLinkText,
  sideFormHint: carerSupportGroup.sideFormHint,
});

await client.createOrReplace({
  _id: "singletonPage.mens_shed",
  _type: "singletonPage",
  pageKey: "mens_shed",
  pageTitle: "Men's Shed",
  jsonData: JSON.stringify(mensShed, null, 2),
});

await client.createOrReplace({
  _id: "singletonPage.bereavement_support_group",
  _type: "singletonPage",
  pageKey: "bereavement_support_group",
  pageTitle: "Bereavement Support Group",
  jsonData: JSON.stringify(bereavementSupportGroup, null, 2),
});

await client.createOrReplace({
  _id: "singletonPage.carer_support_group",
  _type: "singletonPage",
  pageKey: "carer_support_group",
  pageTitle: "Carer Support Group",
  jsonData: JSON.stringify(carerSupportGroup, null, 2),
});

console.log("Seeded Support Groups CMS docs:");
console.log("- supportGroupsPage.main");
console.log("- mensShedPage.main");
console.log("- bereavementSupportGroupPage.main");
console.log("- carerSupportGroupPage.main");
console.log("- singletonPage.mens_shed");
console.log("- singletonPage.bereavement_support_group");
console.log("- singletonPage.carer_support_group");
