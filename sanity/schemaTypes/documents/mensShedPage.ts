import { defineField, defineType } from "sanity";

const textListField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [defineField({ type: "object", fields: [defineField({ name: "text", title: "Text", type: "string" })] })],
  });

export default defineType({
  name: "mensShedPage",
  title: "Men's Shed Page",
  type: "document",
  fields: [
    defineField({ name: "pageTitle", title: "Page Title", type: "string" }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroImageAlt", title: "Hero Image Alt", type: "string" }),
    defineField({ name: "parentNavLabel", title: "Back Link Label", type: "string" }),
    defineField({ name: "parentNavHref", title: "Back Link URL", type: "string" }),
    defineField({ name: "heroH1", title: "Hero Heading", type: "string" }),
    defineField({ name: "heroShortDescription", title: "Hero Short Description", type: "text", rows: 2 }),
    defineField({ name: "whatHeading", title: "What Heading", type: "string" }),
    defineField({ name: "whatBody", title: "What Body", type: "text", rows: 6 }),
    defineField({ name: "whoHeading", title: "Who Heading", type: "string" }),
    textListField("whoList", "Who List"),
    defineField({ name: "helpHeading", title: "Help Heading", type: "string" }),
    defineField({ name: "helpBody", title: "Help Body", type: "text", rows: 4 }),
    defineField({ name: "benefitsHeading", title: "Benefits Heading", type: "string" }),
    textListField("benefitsList", "Benefits List"),
    defineField({ name: "attendanceBody", title: "Attendance Body", type: "text", rows: 3 }),
    defineField({ name: "locationBody", title: "Location Body", type: "text", rows: 3 }),
    defineField({ name: "quoteText", title: "Quote Text", type: "text", rows: 3 }),
    defineField({ name: "quoteAttribution", title: "Quote Attribution", type: "string" }),
    defineField({ name: "referralIntro", title: "Referral Intro", type: "string" }),
    defineField({ name: "referralCta", title: "Referral CTA Label", type: "string" }),
    defineField({ name: "referralCtaHref", title: "Referral CTA URL", type: "string" }),
    defineField({ name: "referralOutro", title: "Referral Outro", type: "string" }),
    defineField({ name: "sideFormLinkText", title: "Side Form Link Text", type: "string" }),
    defineField({ name: "sideFormHint", title: "Side Form Hint", type: "text", rows: 2 }),
  ],
  preview: {
    select: { title: "heroH1", subtitle: "pageTitle", media: "heroImage" },
  },
});
