import { defineField, defineType } from "sanity";

const textListField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [defineField({ type: "object", fields: [defineField({ name: "text", title: "Text", type: "string" })] })],
  });

export default defineType({
  name: "carerPatientWellbeingPage",
  title: "Carer & Patient Wellbeing Page",
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
    defineField({ name: "mainIntro1", title: "Intro Paragraph 1", type: "text", rows: 4 }),
    defineField({ name: "mainIntro2", title: "Intro Paragraph 2", type: "text", rows: 4 }),
    defineField({ name: "mainIntro3", title: "Intro Paragraph 3", type: "text", rows: 4 }),
    defineField({ name: "elementsHeading", title: "Elements Heading", type: "string" }),
    defineField({ name: "elementsIntro", title: "Elements Intro", type: "text", rows: 3 }),
    defineField({
      name: "elementBlocks",
      title: "Element Blocks",
      type: "array",
      of: [
        defineField({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
            textListField("bullets", "Bullets"),
          ],
        }),
      ],
    }),
    defineField({ name: "notMedicalBody", title: "Not Medical Body", type: "text", rows: 3 }),
    defineField({ name: "sessionTimesBody", title: "Session Times Body", type: "text", rows: 3 }),
    defineField({ name: "relatedHeading", title: "Related Heading", type: "string" }),
    defineField({ name: "relatedIntro", title: "Related Intro", type: "text", rows: 3 }),
    defineField({
      name: "relatedLinks",
      title: "Related Links",
      type: "array",
      of: [
        defineField({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "URL", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({ name: "referralIntro", title: "Referral Intro", type: "string" }),
    defineField({ name: "referralCta", title: "Referral CTA Label", type: "string" }),
    defineField({ name: "referralCtaHref", title: "Referral CTA URL", type: "string" }),
    defineField({ name: "referralOutro", title: "Referral Outro", type: "string" }),
    defineField({ name: "sideFormLinkText", title: "Side Form Link Text", type: "string" }),
    defineField({ name: "sideFormHint", title: "Side Form Hint", type: "text", rows: 2 }),
    defineField({
      name: "sectionImage1",
      title: "Section Image 1",
      type: "object",
      fields: [
        defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),
    defineField({
      name: "sectionImage2",
      title: "Section Image 2",
      type: "object",
      fields: [
        defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),
  ],
  preview: { select: { title: "heroH1", subtitle: "pageTitle" } },
});
