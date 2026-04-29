import { defineField, defineType } from "sanity";

const pageKeys = [
  "homepage-content",
  "subpage_reviews",
  "contact",
  "donate",
  "make_a_referral",
  "fundraise_for_us",
  "meet_the_team",
  "support_us_overview",
  "hospice_services_overview",
  "counselling_support_overview",
  "volunteer_your_time",
  "corporate_partnerships",
  "our_corporate_partners",
  "hire_our_facilities",
  "site_archive",
  "resource_hub_page",
  "vacancies_page",
  "bereavement",
  "bereavement_support_group",
  "carer_support_group",
  "counselling",
  "support_groups",
  "mens_shed",
  "wellbeing_activities",
  "nursing_care_medical_advice",
  "complementary_therapies",
  "therapy_bathing",
  "transport",
  "spiritual_chaplaincy_support",
  "carer_patient_wellbeing",
  "dementia_home_sitting",
] as const;

export default defineType({
  name: "singletonPage",
  title: "Singleton Pages (Migration)",
  type: "document",
  fields: [
    defineField({
      name: "pageKey",
      title: "Page Key",
      type: "string",
      options: {
        list: pageKeys.map((value) => ({ title: value, value })),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "pageTitle",
      title: "Page Title",
      type: "string",
      description: "Optional helper title to identify this entry quickly in Studio.",
    }),
    defineField({
      name: "jsonData",
      title: "JSON Data",
      type: "text",
      rows: 24,
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true;
          try {
            JSON.parse(value);
            return true;
          } catch {
            return "Must be valid JSON.";
          }
        }),
      description:
        "Paste the existing JSON page content here during migration. This keeps Decap pages intact while Sanity is being wired in.",
    }),
  ],
  preview: {
    select: { title: "pageTitle", subtitle: "pageKey" },
    prepare({ title, subtitle }) {
      return {
        title: title || subtitle || "Singleton Page",
        subtitle: subtitle || "No key selected",
      };
    },
  },
});
