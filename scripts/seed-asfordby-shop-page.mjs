import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";
import matter from "gray-matter";

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
const sourcePath = path.join(root, "src/content/shops/asfordby-shop.md");
const { data } = matter(readFileSync(sourcePath, "utf8"));

async function uploadPublicImage(webPath) {
  if (!webPath || typeof webPath !== "string") return undefined;
  const rel = webPath.startsWith("/") ? webPath.slice(1) : webPath;
  const full = path.join(root, "public", rel);
  const buf = readFileSync(full);
  const asset = await client.assets.upload("image", buf, { filename: path.basename(full) });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

const heroImage = await uploadPublicImage(data.shop_main_image);
const gallery = Array.isArray(data.gallery)
  ? (
      await Promise.all(
        data.gallery.map(async (imagePath, i) => {
          const image = await uploadPublicImage(imagePath);
          return image ? { ...image, _key: `gallery-${i}` } : null;
        })
      )
    ).filter(Boolean)
  : [];

await client.createOrReplace({
  _id: "asfordbyShopPage.main",
  _type: "asfordbyShopPage",
  title: data.title,
  heroLocation: data.hero_location,
  heroTagline: data.hero_tagline,
  shopInfo: data.shop_info,
  callout: data.callout,
  shopMainImage: heroImage,
  openingHours: data.opening_hours,
  gallery,
  buttonColour: data.button_colour,
  phone: data.phone,
  address: data.address,
  mapEmbedUrl: data.map_embed_url,
  donationsBlurb: data.donations_blurb,
  facebookLink: data.facebook_link,
  instagramLink: data.instagram_link,
  htmlTest: data.html_test,
});

console.log("Seeded Sanity document: asfordbyShopPage.main");
