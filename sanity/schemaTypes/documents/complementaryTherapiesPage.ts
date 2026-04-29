import { defineField, defineType } from "sanity";

export default defineType({
  name: "complementaryTherapiesPage",
  title: "Complementary Therapies Page",
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
    defineField({ name: "benefitsHeading", title: "Benefits Heading", type: "string" }),
    defineField({
      name: "benefitsList",
      title: "Benefits List",
      type: "array",
      of: [{ type: "object", fields: [defineField({ name: "text", title: "Text", type: "string" })] }],
    }),
    defineField({ name: "treatmentsHeading", title: "Treatments Heading", type: "string" }),
    defineField({ name: "treatmentsIntro", title: "Treatments Intro", type: "text", rows: 3 }),
    defineField({
      name: "treatmentsList",
      title: "Treatments List",
      type: "array",
      of: [{ type: "object", fields: [defineField({ name: "text", title: "Text", type: "string" })] }],
    }),
    defineField({ name: "sideFormLinkText", title: "Side Form Link Text", type: "string" }),
    defineField({ name: "sideFormHint", title: "Side Form Hint", type: "text", rows: 2 }),
  ],
  preview: { select: { title: "heroH1", subtitle: "pageTitle" } },
});
