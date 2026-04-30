import { execSync } from "node:child_process";
import { createClient } from "@sanity/client";

const token = process.env.SANITY_AUTH_TOKEN;
if (!token) {
  throw new Error("Missing SANITY_AUTH_TOKEN. Run with: npx sanity exec ... --with-user-token");
}

const backupPath = process.env.BACKUP_PATH;
if (!backupPath) {
  throw new Error("Missing BACKUP_PATH env var pointing to backup .tar.gz");
}

const dataPath = execSync(`tar -tf "${backupPath}" | awk '/data\\.ndjson$/ {print; exit}'`, {
  encoding: "utf8",
})
  .trim();

if (!dataPath) {
  throw new Error("Could not locate data.ndjson inside backup archive.");
}

const ndjson = execSync(`tar -xOf "${backupPath}" "${dataPath}"`, {
  encoding: "utf8",
  maxBuffer: 1024 * 1024 * 100,
});

const client = createClient({
  projectId: "juhj0d5o",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token,
});

const docs = ndjson
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line) => JSON.parse(line))
  .filter((doc) => doc?._type === "newsPost" || doc?._type === "eventPost")
  .filter((doc) => !String(doc._id || "").startsWith("drafts."));

let imported = 0;
for (const doc of docs) {
  await client.createOrReplace(doc);
  imported += 1;
}

console.log(`Imported ${imported} documents (newsPost/eventPost) from backup.`);
