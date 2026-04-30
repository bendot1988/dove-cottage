import { defineField, defineType } from "sanity";

const overviewCardFields = [
  defineField({ name: "title", title: "Title", type: "string" }),
  defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
  defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
  defineField({ name: "imageAlt", title: "Image Alt", type: "string" }),
  defineField({ name: "badge", title: "Badge", type: "string" }),
  defineField({
      name: "stat",
      title: "Stat Line",
      type: "string",
      description: "Optional line shown on cards (e.g. opening times).",
    }),
  defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
  defineField({ name: "href", title: "Link URL", type: "string" }),
];

export default defineType({
  name: "hospiceServicesOverviewPage",
  title: "Hospice Services Overview Page",
  type: "document",
  fields: [
    defineField({ name: "pageTitle", title: "Page Title", type: "string" }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroImageAlt", title: "Hero Image Alt", type: "string" }),
    defineField({ name: "parentNavLabel", title: "Back Link Label", type: "string" }),
    defineField({ name: "parentNavHref", title: "Back Link URL", type: "string" }),
    defineField({ name: "heroH1", title: "Hero Heading", type: "string" }),
    defineField({ name: "heroShortDescription", title: "Hero Short Description", type: "text", rows: 2 }),
    defineField({
      name: "homepageCareCardExcerpt",
      title: "Homepage Care Card Excerpt",
      type: "text",
      rows: 2,
      description: "Shown on the homepage care card when this overview is the source.",
    }),
    defineField({ name: "introEyebrow", title: "Intro Eyebrow", type: "string" }),
    defineField({ name: "introHeading", title: "Intro Heading", type: "string" }),
    defineField({
      name: "introKeyFacts",
      title: "Intro Key Facts",
      type: "array",
      of: [
        defineField({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({ name: "mainIntro1", title: "Main Intro 1", type: "text", rows: 3 }),
    defineField({ name: "mainIntro2", title: "Main Intro 2", type: "text", rows: 3 }),
    defineField({ name: "mainIntro3", title: "Main Intro 3", type: "text", rows: 3 }),
    defineField({
      name: "buildingCards",
      title: "Building Cards",
      type: "array",
      of: [defineField({ type: "object", fields: overviewCardFields })],
    }),
    defineField({ name: "additionalHeading", title: "Additional Section Heading", type: "string" }),
    defineField({ name: "additionalIntro", title: "Additional Section Intro", type: "text", rows: 3 }),
    defineField({
      name: "additionalCards",
      title: "Additional Cards",
      type: "array",
      of: [defineField({ type: "object", fields: overviewCardFields })],
    }),
    defineField({ name: "referralIntro", title: "Referral Intro", type: "text", rows: 2 }),
    defineField({ name: "referralMid", title: "Referral Mid (before CTA)", type: "string" }),
    defineField({ name: "referralCta", title: "Referral CTA Label", type: "string" }),
    defineField({ name: "referralCtaHref", title: "Referral CTA URL", type: "string" }),
    defineField({ name: "referralOutro", title: "Referral Outro", type: "string" }),
  ],
  preview: {
    select: { title: "heroH1", subtitle: "pageTitle" },
  },
});
