import { createClient } from "@sanity/client";

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) {
  throw new Error("Missing SANITY_AUTH_TOKEN. Run via: npx sanity exec ... --with-user-token");
}

const client = createClient({
  projectId: "juhj0d5o",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token,
});

const ids = await client.fetch(`*[
  !(_id in path("_.**"))
]._id`);

if (!Array.isArray(ids) || ids.length === 0) {
  console.log("No documents found to delete.");
  process.exit(0);
}

let deleted = 0;
const chunkSize = 100;

for (let i = 0; i < ids.length; i += chunkSize) {
  const chunk = ids.slice(i, i + chunkSize);
  const tx = client.transaction();
  for (const id of chunk) tx.delete(id);
  await tx.commit();
  deleted += chunk.length;
  console.log(`Deleted ${deleted}/${ids.length}`);
}

console.log(`Done. Deleted ${deleted} document(s) from production dataset.`);
