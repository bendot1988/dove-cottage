import { defineField, defineType } from "sanity";

const impactCardFields = [
  defineField({ name: "title", title: "Title", type: "string" }),
  defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
  defineField({ name: "ctaLabel", title: "Button Label", type: "string" }),
  defineField({ name: "ctaHref", title: "Button URL", type: "string" }),
];

const suggestedMethodFields = [
  defineField({ name: "icon", title: "Icon", type: "string" }),
  defineField({ name: "kicker", title: "Kicker", type: "string" }),
  defineField({ name: "body", title: "Body", type: "text", rows: 3 }),
];

export default defineType({
  name: "makeDonationPage",
  title: "Make a Donation Page",
  type: "document",
  fields: [
    defineField({ name: "pageTitle", title: "Page Title", type: "string" }),
    defineField({ name: "donateFormSectionTitle", title: "Donate Form Section Title", type: "string" }),
    defineField({ name: "donateFormIntro", title: "Donate Form Intro", type: "text", rows: 3 }),
    defineField({ name: "beaconAccount", title: "Beacon Account", type: "string" }),
    defineField({ name: "beaconDonateFormId", title: "Beacon Donate Form ID", type: "string" }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroImageAlt", title: "Hero Image Alt", type: "string" }),
    defineField({ name: "allWaysToSupportLabel", title: "Back Link Label", type: "string" }),
    defineField({ name: "allWaysToSupportHref", title: "Back Link URL", type: "string" }),
    defineField({ name: "heroTitleBefore", title: "Hero Title (Before)", type: "string" }),
    defineField({ name: "heroTitleHighlight", title: "Hero Title (Highlight)", type: "string" }),
    defineField({ name: "heroDescription", title: "Hero Description", type: "text", rows: 3 }),
    defineField({ name: "heroPrimaryCtaLabel", title: "Primary CTA Label", type: "string" }),
    defineField({ name: "heroPrimaryCtaHref", title: "Primary CTA URL", type: "string" }),
    defineField({ name: "heroSecondaryCtaLabel", title: "Secondary CTA Label", type: "string" }),
    defineField({ name: "heroSecondaryCtaHref", title: "Secondary CTA URL", type: "string" }),
    defineField({ name: "aboutEyebrow", title: "About Eyebrow", type: "string" }),
    defineField({ name: "aboutHeading", title: "About Heading", type: "string" }),
    defineField({ name: "aboutParagraph1", title: "About Paragraph 1", type: "text", rows: 3 }),
    defineField({ name: "aboutParagraph2", title: "About Paragraph 2", type: "text", rows: 3 }),
    defineField({ name: "impactHeading", title: "Impact Heading", type: "string" }),
    defineField({ name: "impactLede", title: "Impact Intro", type: "text", rows: 3 }),
    defineField({
      name: "impactCards",
      title: "Impact Cards",
      type: "array",
      of: [defineField({ type: "object", fields: impactCardFields })],
    }),
    defineField({ name: "suggestedMethodsTitle", title: "Suggested Methods Title", type: "string" }),
    defineField({
      name: "suggestedMethods",
      title: "Suggested Methods",
      type: "array",
      of: [defineField({ type: "object", fields: suggestedMethodFields })],
    }),
  ],
  preview: {
    select: { title: "heroTitleHighlight", subtitle: "pageTitle" },
  },
});
