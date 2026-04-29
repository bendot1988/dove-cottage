import { createClient } from "@sanity/client";
import facilities from "../src/data/hire-our-facilities.json" with { type: "json" };

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

const doc = {
  _id: "ourFacilitiesPage.main",
  _type: "ourFacilitiesPage",
  pageTitle: "Our Facilities | Dove Cottage",
  heroImage: facilities.heroImage,
  heroImageAlt: facilities.heroImageAlt,
  parentNavLabel: "About Us",
  parentNavHref: "/explore/",
  heroH1: "Our Facilities",
  heroShortDescription:
    "Explore the welcoming spaces at Dove Cottage, from our salon and therapy rooms to meeting spaces, gardens, and accessible facilities.",
  introBlocks: [facilities.mainIntro1, facilities.mainIntro2].filter(Boolean),
  gallerySections: (facilities.gallerySections || []).map((section) => ({
    _type: "gallerySection",
    heading: section.heading,
    images: (section.images || []).map((image) => ({
      _type: "imageItem",
      src: image.src,
      alt: image.alt,
    })),
  })),
};

await client.createOrReplace(doc);
console.log("Seeded Sanity document: ourFacilitiesPage.main");
