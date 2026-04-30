import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { createClient } from "@sanity/client";

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) throw new Error("Missing SANITY_AUTH_TOKEN. Run with: npx sanity exec ... --with-user-token");

const client = createClient({
  projectId: "juhj0d5o",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token,
});

const newslettersDir = path.resolve(process.cwd(), "src/content/newsletters");
const fileNames = (await fs.readdir(newslettersDir)).filter((name) => name.endsWith(".md"));

const toSlug = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);

for (const fileName of fileNames) {
  const sourcePath = path.join(newslettersDir, fileName);
  const raw = await fs.readFile(sourcePath, "utf8");
  const { data } = matter(raw);

  const title = data.title || fileName.replace(/\.md$/, "");
  const slug = toSlug(data.slug?.current || title || fileName.replace(/\.md$/, ""));
  const docId = `newsletterIssue.${slug}`;

  await client.createOrReplace({
    _id: docId,
    _type: "newsletterIssue",
    title,
    slug: { _type: "slug", current: slug },
    issueDate: data.issueDate || null,
    fileLabel: data.fileLabel || "Download PDF",
    excerpt: data.excerpt || "",
    draft: Boolean(data.draft),
    file: data.file
      ? {
          _type: "object",
          legacyUrl: data.file,
        }
      : undefined,
  });

  console.log(`Seeded Sanity document: ${docId}`);
}
