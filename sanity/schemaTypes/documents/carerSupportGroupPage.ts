import { defineField, defineType } from "sanity";

const textListField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [defineField({ type: "object", fields: [defineField({ name: "text", title: "Text", type: "string" })] })],
  });

export default defineType({
  name: "carerSupportGroupPage",
  title: "Carer Support Group Page",
  type: "document",
  fields: [
    defineField({ name: "pageTitle", title: "Page Title", type: "string" }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroImageAlt", title: "Hero Image Alt", type: "string" }),
    defineField({ name: "parentNavLabel", title: "Back Link Label", type: "string" }),
    defineField({ name: "parentNavHref", title: "Back Link URL", type: "string" }),
    defineField({ name: "heroH1", title: "Hero Heading", type: "string" }),
    defineField({ name: "heroShortDescription", title: "Hero Short Description", type: "text", rows: 2 }),
    defineField({ name: "mainIntro1", title: "Intro Paragraph 1", type: "text", rows: 4 }),
    defineField({ name: "mainIntro2", title: "Intro Paragraph 2", type: "text", rows: 4 }),
    defineField({
      name: "sectionImage1",
      title: "Section Image",
      type: "object",
      fields: [
        defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),
    defineField({ name: "whoHeading", title: "Who Heading", type: "string" }),
    textListField("whoList", "Who List"),
    defineField({ name: "helpHeading", title: "Help Heading", type: "string" }),
    textListField("helpList", "Help List"),
    defineField({ name: "detailsFoot", title: "Details Footnote", type: "text", rows: 3 }),
    defineField({ name: "registerInterestIntro", title: "Register Interest Intro", type: "string" }),
    defineField({ name: "registerInterestCta", title: "Register Interest CTA Label", type: "string" }),
    defineField({ name: "registerInterestHref", title: "Register Interest URL", type: "string" }),
    defineField({ name: "registerInterestOutro", title: "Register Interest Outro", type: "string" }),
    defineField({ name: "sideFormLinkText", title: "Side Form Link Text", type: "string" }),
    defineField({ name: "sideFormHint", title: "Side Form Hint", type: "text", rows: 2 }),
  ],
  preview: {
    select: { title: "heroH1", subtitle: "pageTitle", media: "heroImage" },
  },
});
