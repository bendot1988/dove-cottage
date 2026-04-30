import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import data from "../src/data/meet-the-team.json" with { type: "json" };

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

const teamGroups = [];
for (const [groupIndex, group] of (data.teamGroups ?? []).entries()) {
  const members = [];
  for (const [memberIndex, member] of (group.members ?? []).entries()) {
    members.push({
      _key: `member-${groupIndex}-${memberIndex}`,
      name: member.name,
      jobTitle: member.jobTitle,
      photo: {
        image: await uploadPublicImage(member.photo),
        legacyUrl: member.photo,
      },
      photoAlt: member.photoAlt,
    });
  }
  teamGroups.push({
    _key: `group-${groupIndex}`,
    title: group.title,
    members,
  });
}

const testimonials = [];
for (const [index, item] of (data.testimonials ?? []).entries()) {
  testimonials.push({
    _key: `testimonial-${index}`,
    quote: item.quote,
    rating: item.rating,
    authorName: item.authorName,
    authorRole: item.authorRole,
    authorPhoto: {
      image: await uploadPublicImage(item.authorPhoto),
      legacyUrl: item.authorPhoto,
    },
    authorPhotoAlt: item.authorPhotoAlt,
  });
}

await client.createOrReplace({
  _id: "meetTheTeamPage.main",
  _type: "meetTheTeamPage",
  pageTitle: data.pageTitle,
  metaDescription: data.metaDescription,
  heroImage: {
    image: heroImage,
    legacyUrl: data.heroImage,
  },
  heroImageAlt: data.heroImageAlt,
  parentNavLabel: data.parentNavLabel,
  parentNavHref: data.parentNavHref,
  heroH1: data.heroH1,
  heroShortDescription: data.heroShortDescription,
  teamGroups,
  stats: (data.stats ?? []).map((stat, i) => ({ ...stat, _key: `stat-${i}` })),
  testimonials,
});

console.log("Seeded Sanity document: meetTheTeamPage.main");
