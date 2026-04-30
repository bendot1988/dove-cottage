import { defineField, defineType } from "sanity";

const overviewCardFields = [
  defineField({ name: "title", title: "Title", type: "string" }),
  defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
  defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
  defineField({ name: "imageAlt", title: "Image Alt", type: "string" }),
  defineField({ name: "badge", title: "Badge", type: "string" }),
  defineField({ name: "stat", title: "Stat Line", type: "string" }),
  defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
  defineField({ name: "href", title: "Link URL", type: "string" }),
];

export default defineType({
  name: "counsellingSupportOverviewPage",
  title: "Counselling Support Overview Page",
  type: "document",
  fields: [
    defineField({ name: "pageTitle", title: "Page Title", type: "string" }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroImageAlt", title: "Hero Image Alt", type: "string" }),
    defineField({ name: "parentNavLabel", title: "Back Link Label", type: "string" }),
    defineField({ name: "parentNavHref", title: "Back Link URL", type: "string" }),
    defineField({ name: "heroH1", title: "Hero Heading", type: "string" }),
    defineField({ name: "heroShortDescription", title: "Hero Short Description", type: "text", rows: 2 }),
    defineField({ name: "homepageCareCardExcerpt", title: "Homepage Care Card Excerpt", type: "text", rows: 2 }),
    defineField({ name: "introEyebrow", title: "Intro Eyebrow", type: "string" }),
    defineField({ name: "introHeading", title: "Intro Heading", type: "string" }),
    defineField({ name: "mainIntro1", title: "Main Intro 1", type: "text", rows: 3 }),
    defineField({ name: "mainIntro2", title: "Main Intro 2", type: "text", rows: 3 }),
    defineField({ name: "mainIntro3", title: "Main Intro 3", type: "text", rows: 3 }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [defineField({ type: "object", fields: overviewCardFields })],
    }),
    defineField({ name: "referralIntro", title: "Referral Intro", type: "string" }),
    defineField({ name: "referralCta", title: "Referral CTA Label", type: "string" }),
    defineField({ name: "referralCtaHref", title: "Referral CTA URL", type: "string" }),
    defineField({ name: "referralOutro", title: "Referral Outro", type: "string" }),
  ],
  preview: { select: { title: "heroH1", subtitle: "pageTitle" } },
});
