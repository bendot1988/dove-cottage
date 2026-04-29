import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { createClient } from "@sanity/client";

const projectId = "juhj0d5o";
const dataset = "production";

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) {
  throw new Error("SANITY_AUTH_TOKEN is missing. Run via: npx sanity exec ... --with-user-token");
}

const client = createClient({
  projectId,
  dataset,
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
    children: [
      {
        _type: "span",
        _key: `s${index}`,
        text,
        marks: [],
      },
    ],
  }));
}

function toDateOnly(value) {
  if (!value) return undefined;
  const raw = String(value).trim();
  if (!raw) return undefined;
  return raw.length >= 10 ? raw.slice(0, 10) : raw;
}

async function upsertMarkdownFolder({ folderPath, docType, mapper }) {
  const files = (await fs.readdir(folderPath)).filter((name) => name.endsWith(".md"));
  let count = 0;

  for (const fileName of files) {
    const filePath = path.join(folderPath, fileName);
    const slug = fileName.replace(/\.md$/, "");
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = matter(raw);
    const data = parsed.data || {};

    const doc = mapper({ slug, data, body: parsed.content });
    doc._id = `${docType}.${slug}`;
    doc._type = docType;

    await client.createOrReplace(doc);
    count += 1;
  }

  return count;
}

const root = process.cwd();

const newsCount = await upsertMarkdownFolder({
  folderPath: path.join(root, "src/content/blog"),
  docType: "newsPost",
  mapper: ({ slug, data, body }) => ({
    title: data.title || slug,
    slug: { _type: "slug", current: slug },
    category: data.category || "News",
    excerpt: data.excerpt || "",
    publishDate: toDateOnly(data.publishDate),
    author: data.author || "Dove Cottage Day Hospice",
    eventDate: toDateOnly(data.eventDate),
    eventEndDate: toDateOnly(data.eventEndDate),
    eventLocation: data.eventLocation || undefined,
    draft: Boolean(data.draft),
    body: markdownToPortableText(body),
  }),
});

const eventsCount = await upsertMarkdownFolder({
  folderPath: path.join(root, "src/content/events"),
  docType: "eventPost",
  mapper: ({ slug, data, body }) => ({
    title: data.title || slug,
    slug: { _type: "slug", current: slug },
    category: data.category || "Event",
    excerpt: data.excerpt || "",
    eventDate: toDateOnly(data.eventDate),
    eventEndDate: toDateOnly(data.eventEndDate),
    location: data.location || "",
    bookingUrl: data.bookingUrl || undefined,
    draft: Boolean(data.draft),
    body: markdownToPortableText(body),
  }),
});

console.log(`Imported ${newsCount} news posts and ${eventsCount} event posts.`);
