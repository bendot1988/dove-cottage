import { defineField, defineType } from "sanity";

export default defineType({
  name: "nursingCareMedicalAdvicePage",
  title: "Nursing Care & Medical Advice Page",
  type: "document",
  fields: [
    defineField({ name: "pageTitle", title: "Page Title", type: "string" }),
    defineField({ name: "heroImage", title: "Hero Image URL/Path", type: "string" }),
    defineField({ name: "heroImageAlt", title: "Hero Image Alt", type: "string" }),
    defineField({ name: "parentNavLabel", title: "Back Link Label", type: "string" }),
    defineField({ name: "parentNavHref", title: "Back Link URL", type: "string" }),
    defineField({ name: "heroH1", title: "Hero Heading", type: "string" }),
    defineField({ name: "heroShortDescription", title: "Hero Short Description", type: "text", rows: 2 }),
    defineField({ name: "mainIntro1", title: "Intro Paragraph 1", type: "text", rows: 3 }),
    defineField({ name: "mainIntro2", title: "Intro Paragraph 2", type: "text", rows: 3 }),
    defineField({
      name: "sectionImage1",
      title: "Main Section Image",
      type: "object",
      fields: [
        defineField({ name: "src", title: "Image URL/Path", type: "string" }),
        defineField({ name: "alt", title: "Image Alt", type: "string" }),
      ],
    }),
    defineField({ name: "nursingHeading", title: "Nursing Heading", type: "string" }),
    defineField({ name: "nursingIntro", title: "Nursing Intro", type: "text", rows: 3 }),
    defineField({
      name: "nursingList",
      title: "Nursing List",
      type: "array",
      of: [{ type: "object", fields: [defineField({ name: "text", title: "Text", type: "string" })] }],
    }),
    defineField({ name: "medicalHeading", title: "Medical Heading", type: "string" }),
    defineField({ name: "medicalBody", title: "Medical Body", type: "text", rows: 3 }),
    defineField({ name: "advocacyHeading", title: "Advocacy Heading", type: "string" }),
    defineField({ name: "advocacyIntro", title: "Advocacy Intro", type: "text", rows: 3 }),
    defineField({
      name: "advocacyList",
      title: "Advocacy List",
      type: "array",
      of: [{ type: "object", fields: [defineField({ name: "text", title: "Text", type: "string" })] }],
    }),
    defineField({ name: "additionalHeading", title: "Additional Heading", type: "string" }),
    defineField({ name: "additionalIntro", title: "Additional Intro", type: "text", rows: 3 }),
    defineField({
      name: "additionalServices",
      title: "Additional Services",
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
    defineField({ name: "sideFormLinkText", title: "Side Form Link Text", type: "string" }),
    defineField({ name: "sideFormHint", title: "Side Form Hint", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "heroH1", subtitle: "pageTitle" } },
});
