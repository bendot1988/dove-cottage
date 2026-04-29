import { defineField, defineType } from "sanity";

export default defineType({
  name: "counsellingPage",
  title: "Counselling Page",
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
    defineField({ name: "emotionalHeading", title: "Emotional Heading", type: "string" }),
    defineField({ name: "emotionalIntro", title: "Emotional Intro", type: "text", rows: 3 }),
    defineField({
      name: "emotionalList",
      title: "Emotional Support List",
      type: "array",
      of: [{ type: "object", fields: [defineField({ name: "text", title: "Text", type: "string" })] }],
    }),
    defineField({ name: "practicalHeading", title: "Practical Heading", type: "string" }),
    defineField({ name: "practicalBody", title: "Practical Body", type: "text", rows: 4 }),
    defineField({ name: "sideFormLinkText", title: "Side Form Link Text", type: "string" }),
    defineField({ name: "sideFormHint", title: "Side Form Hint", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "heroH1", subtitle: "pageTitle" } },
});
