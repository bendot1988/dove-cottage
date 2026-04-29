import fs from "node:fs/promises";
import path from "node:path";
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

const keyMap = {
  "homepage.json": "homepage-content",
  "subpage-reviews.json": "subpage_reviews",
  "contact.json": "contact",
  "donate.json": "donate",
  "make-a-referral.json": "make_a_referral",
  "fundraise-for-us.json": "fundraise_for_us",
  "meet-the-team.json": "meet_the_team",
  "support-us-overview.json": "support_us_overview",
  "hospice-services-overview.json": "hospice_services_overview",
  "counselling-support-overview.json": "counselling_support_overview",
  "volunteer-your-time.json": "volunteer_your_time",
  "corporate-partnerships.json": "corporate_partnerships",
  "our-corporate-partners.json": "our_corporate_partners",
  "hire-our-facilities.json": "hire_our_facilities",
  "site-archive.json": "site_archive",
  "resource-hub.json": "resource_hub_page",
  "vacancies.json": "vacancies_page",
  "bereavement-support.json": "bereavement",
  "bereavement-support-group.json": "bereavement_support_group",
  "carer-support.json": "carer_support_group",
  "counselling.json": "counselling",
  "support-groups.json": "support_groups",
  "mens-shed.json": "mens_shed",
  "wellbeing-activities.json": "wellbeing_activities",
  "nursing-care-medical-advice.json": "nursing_care_medical_advice",
  "complementary-therapies.json": "complementary_therapies",
  "therapy-bathing.json": "therapy_bathing",
  "transport.json": "transport",
  "spiritual-chaplaincy-support.json": "spiritual_chaplaincy_support",
  "carer-patient-wellbeing.json": "carer_patient_wellbeing",
  "dementia-home-sitting.json": "dementia_home_sitting",
};

const dataDir = path.join(process.cwd(), "src/data");
const files = Object.keys(keyMap);
let count = 0;

for (const fileName of files) {
  const filePath = path.join(dataDir, fileName);
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = JSON.parse(raw);
  const pageKey = keyMap[fileName];

  await client.createOrReplace({
    _id: `singletonPage.${pageKey}`,
    _type: "singletonPage",
    pageKey,
    pageTitle: parsed.pageTitle || pageKey,
    jsonData: JSON.stringify(parsed, null, 2),
  });
  count += 1;
}

console.log(`Imported ${count} singleton pages.`);
