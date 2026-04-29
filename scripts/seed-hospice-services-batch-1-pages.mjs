import { createClient } from "@sanity/client";
import nursing from "../src/data/nursing-care-medical-advice.json" with { type: "json" };
import wellbeing from "../src/data/wellbeing-activities.json" with { type: "json" };
import complementary from "../src/data/complementary-therapies.json" with { type: "json" };
import counselling from "../src/data/counselling.json" with { type: "json" };

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

await client.createOrReplace({
  _id: "nursingCareMedicalAdvicePage.main",
  _type: "nursingCareMedicalAdvicePage",
  ...nursing,
});

await client.createOrReplace({
  _id: "wellbeingActivitiesPage.main",
  _type: "wellbeingActivitiesPage",
  ...wellbeing,
});

await client.createOrReplace({
  _id: "complementaryTherapiesPage.main",
  _type: "complementaryTherapiesPage",
  ...complementary,
});

await client.createOrReplace({
  _id: "counsellingPage.main",
  _type: "counsellingPage",
  ...counselling,
});

console.log(
  "Seeded: nursingCareMedicalAdvicePage.main, wellbeingActivitiesPage.main, complementaryTherapiesPage.main, counsellingPage.main",
);
