import { defineField, defineType } from "sanity";

const textListField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [defineField({ type: "object", fields: [defineField({ name: "text", title: "Text", type: "string" })] })],
  });

export default defineType({
  name: "dementiaHomeSittingPage",
  title: "Dementia Home Sitting Page",
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
    defineField({ name: "mainIntro1", title: "Intro Paragraph 1", type: "text", rows: 3 }),
    defineField({ name: "mainIntro2", title: "Intro Paragraph 2", type: "text", rows: 3 }),
    defineField({
      name: "sectionImage1",
      title: "Main Section Image",
      type: "object",
      fields: [
        defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),
    defineField({ name: "serviceHeading", title: "Service Heading", type: "string" }),
    defineField({ name: "serviceIntro", title: "Service Intro", type: "text", rows: 3 }),
    defineField({ name: "serviceOfferHeading", title: "Service Offer Heading", type: "string" }),
    textListField("serviceOfferList", "Service Offer List"),
    defineField({ name: "serviceOutro", title: "Service Outro", type: "text", rows: 2 }),
    defineField({ name: "whoHeading", title: "Who Heading", type: "string" }),
    textListField("whoList", "Who List"),
    defineField({ name: "helpHeading", title: "Help Heading", type: "string" }),
    defineField({
      name: "helpCards",
      title: "Help Cards",
      type: "array",
      of: [
        defineField({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            textListField("bullets", "Bullets"),
          ],
        }),
      ],
    }),
    defineField({ name: "importantHeading", title: "Important Heading", type: "string" }),
    textListField("importantList", "Important List"),
    defineField({ name: "importantOutro", title: "Important Outro", type: "text", rows: 2 }),
    defineField({ name: "flexHeading", title: "Flexible Support Heading", type: "string" }),
    defineField({ name: "flexIntro", title: "Flexible Support Intro", type: "text", rows: 2 }),
    textListField("flexList", "Flexible Support List"),
    defineField({ name: "referralsHeading", title: "Referrals Heading", type: "string" }),
    defineField({ name: "referralsBody1", title: "Referrals Body 1", type: "text", rows: 3 }),
    defineField({ name: "referralsBody2", title: "Referrals Body 2", type: "text", rows: 3 }),
    defineField({ name: "referralIntro", title: "Referral Intro", type: "string" }),
    defineField({ name: "referralCta", title: "Referral CTA Label", type: "string" }),
    defineField({ name: "referralCtaHref", title: "Referral CTA URL", type: "string" }),
    defineField({ name: "referralOutro", title: "Referral Outro", type: "string" }),
    defineField({ name: "sideFormLinkText", title: "Side Form Link Text", type: "string" }),
    defineField({ name: "sideFormHint", title: "Side Form Hint", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "heroH1", subtitle: "pageTitle" } },
});
