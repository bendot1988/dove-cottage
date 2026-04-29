import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { createClient } from "@sanity/client";

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) {
  throw new Error("SANITY_AUTH_TOKEN is missing. Run via: npx sanity exec ... --with-user-token");
}

const client = createClient({
  projectId: "juhj0d5o",
  dataset: "production",
  token,
  apiVersion: "2025-01-01",
  useCdn: false,
});

function markdownToPortableText(markdown) {
  const cleaned = (markdown || "").trim();
  if (!cleaned) return [];
  const paragraphs = cleaned
    .split(/\n\s*\n/g)
    .map((part) => part.replace(/\n/g, " ").trim())
    .filter(Boolean);

  return paragraphs.map((text, index) => ({
    _type: "block",
    _key: `b${index}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `s${index}`, text, marks: [] }],
  }));
}

const root = process.cwd();

async function migrateNewsletters() {
  const dir = path.join(root, "src/content/newsletters");
  const files = (await fs.readdir(dir)).filter((f) => f.endsWith(".md"));
  let count = 0;

  for (const fileName of files) {
    const raw = await fs.readFile(path.join(dir, fileName), "utf8");
    const { data, content } = matter(raw);
    const slug = fileName.replace(/\.md$/, "");

    await client.createOrReplace({
      _id: `newsletterIssue.${slug}`,
      _type: "newsletterIssue",
      title: data.title || slug,
      slug: { _type: "slug", current: slug },
      issueDate: data.issueDate ? String(data.issueDate).slice(0, 10) : undefined,
      file: { legacyUrl: data.file || "" },
      fileLabel: data.fileLabel || "Download PDF",
      excerpt: data.excerpt || "",
      draft: Boolean(data.draft),
      body: markdownToPortableText(content),
    });
    count += 1;
  }

  return count;
}

async function migrateShops() {
  const dir = path.join(root, "src/content/shops");
  const files = (await fs.readdir(dir)).filter((f) => f.endsWith(".md"));
  let count = 0;

  for (const fileName of files) {
    const raw = await fs.readFile(path.join(dir, fileName), "utf8");
    const { data, content } = matter(raw);
    const slug = fileName.replace(/\.md$/, "");

    await client.createOrReplace({
      _id: `shop.${slug}`,
      _type: "shop",
      title: data.title || slug,
      slug: { _type: "slug", current: slug },
      hero_location: data.hero_location || "",
      hero_tagline: data.hero_tagline || "Hospice Shop",
      shop_info: markdownToPortableText(data.shop_info || ""),
      callout: markdownToPortableText(data.callout || ""),
      shop_main_image: { legacyUrl: data.shop_main_image || "" },
      opening_hours: markdownToPortableText(data.opening_hours || ""),
      gallery: Array.isArray(data.gallery)
        ? data.gallery.map((entry, index) => ({
            _type: "legacyGalleryUrl",
            _key: `legacy-${index}`,
            url: entry,
          }))
        : [],
      button_colour: data.button_colour || "#2d6fb3",
      phone: data.phone || "",
      address: data.address || "",
      map_embed_url: data.map_embed_url || "",
      donations_blurb: data.donations_blurb || "",
      facebook_link: data.facebook_link || "",
      instagram_link: data.instagram_link || "",
      html_test: data.html_test || "",
      draft: Boolean(data.draft),
      body: markdownToPortableText(content),
    });
    count += 1;
  }

  return count;
}

const newsletters = await migrateNewsletters();
const shops = await migrateShops();
console.log(`Imported ${newsletters} newsletters and ${shops} shops.`);
