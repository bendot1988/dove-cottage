import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import page from "../src/data/hire-our-facilities.json" with { type: "json" };

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
  const filename = path.basename(full);
  const asset = await client.assets.upload("image", buf, { filename });
  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
  };
}

const introBlocks = [page.mainIntro1, page.mainIntro2, page.mainIntro3, page.mainIntro4].filter((text) => text?.trim());

const heroImage = await uploadPublicImage(page.heroImage);

const sidebarPeekCards = await Promise.all(
  (page.sidebarPeekCards ?? []).map(async (card, index) => ({
    _key: `sidebar-card-${index}`,
    title: card.title,
    href: card.href,
    image: {
      image: await uploadPublicImage(card.image),
      legacyUrl: card.image,
    },
  }))
);

const gallerySections = await Promise.all(
  (page.gallerySections ?? []).map(async (section, sectionIndex) => ({
    _key: `gallery-section-${sectionIndex}`,
    heading: section.heading,
    images: await Promise.all(
      (section.images ?? []).map(async (image, imageIndex) => ({
        _key: `gallery-image-${sectionIndex}-${imageIndex}`,
        image: {
          image: await uploadPublicImage(image.src),
          legacyUrl: image.src,
        },
        alt: image.alt,
      }))
    ),
  }))
);

const sections = (page.sections ?? []).map((section, index) => ({
  _key: `section-${index}`,
  heading: section.heading,
  subheading: section.subheading,
  body: section.body,
  bullets: (section.bullets ?? []).map((bullet, bulletIndex) => ({
    _key: `section-${index}-bullet-${bulletIndex}`,
    text: typeof bullet === "string" ? bullet : bullet.text,
  })),
  closing: section.closing,
}));

await client.createOrReplace({
  _id: "hireOurFacilitiesPage.main",
  _type: "hireOurFacilitiesPage",
  pageTitle: page.pageTitle,
  heroImage: {
    image: heroImage,
    legacyUrl: page.heroImage,
  },
  heroImageAlt: page.heroImageAlt,
  parentNavLabel: page.parentNavLabel,
  parentNavHref: page.parentNavHref,
  heroH1: page.heroH1,
  heroShortDescription: page.heroShortDescription,
  introBlocks,
  sections,
  impactHeading: page.impactHeading,
  impactBody: page.impactBody,
  formHeading: page.formHeading,
  formIntro: page.formIntro,
  sideFormLinkText: page.sideFormLinkText,
  sideFormHint: page.sideFormHint,
  sidebarPeekTitle: page.sidebarPeekTitle,
  sidebarPeekViewAllHref: page.sidebarPeekViewAllHref,
  sidebarPeekViewAllLabel: page.sidebarPeekViewAllLabel,
  sidebarPeekCards,
  gallerySections,
});

console.log("Seeded Sanity document: hireOurFacilitiesPage.main");
