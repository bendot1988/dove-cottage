import { defineField, defineType } from "sanity";

const paragraphArrayField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [defineField({ type: "object", fields: [defineField({ name: "text", title: "Text", type: "text", rows: 3 })] })],
  });

export default defineType({
  name: "leaveGiftInWillPage",
  title: "Leave a Gift in Your Will Page",
  type: "document",
  fields: [
    defineField({ name: "pageTitle", title: "Page Title", type: "string" }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "text", rows: 3 }),
    defineField({ name: "heroImage", title: "Hero Image URL/Path", type: "string" }),
    defineField({ name: "heroImageAlt", title: "Hero Image Alt", type: "string" }),
    defineField({ name: "parentNavLabel", title: "Back Link Label", type: "string" }),
    defineField({ name: "parentNavHref", title: "Back Link URL", type: "string" }),
    defineField({ name: "heroH1", title: "Hero Heading", type: "string" }),
    defineField({ name: "heroShortDescription", title: "Hero Description", type: "text", rows: 3 }),
    defineField({ name: "lastingGiftHeading", title: "A Lasting Gift Heading", type: "string" }),
    paragraphArrayField("lastingGiftParagraphs", "A Lasting Gift Paragraphs"),
    defineField({ name: "legacyHeading", title: "What Is a Legacy Heading", type: "string" }),
    paragraphArrayField("legacyParagraphs", "What Is a Legacy Paragraphs"),
    defineField({ name: "typesHeading", title: "Types of Legacy Heading", type: "string" }),
    paragraphArrayField("typesParagraphs", "Types of Legacy Paragraphs"),
    defineField({
      name: "typesList",
      title: "Types List",
      type: "array",
      of: [defineField({ type: "object", fields: [defineField({ name: "text", title: "Text", type: "string" })] })],
    }),
    defineField({ name: "whyHeading", title: "Why Leave a Legacy Heading", type: "string" }),
    paragraphArrayField("whyParagraphs", "Why Leave a Legacy Paragraphs"),
    defineField({ name: "makingHeading", title: "Making a Will Heading", type: "string" }),
    paragraphArrayField("makingParagraphs", "Making a Will Paragraphs"),
    defineField({ name: "freeWillTitle", title: "Free Will Service Title", type: "string" }),
    paragraphArrayField("freeWillParagraphs", "Free Will Service Paragraphs"),
    defineField({ name: "freeWillCtaLabel", title: "Free Will CTA Label", type: "string" }),
    defineField({ name: "freeWillCtaHref", title: "Free Will CTA URL", type: "string" }),
    defineField({ name: "codicilsHeading", title: "Codicils Heading", type: "string" }),
    paragraphArrayField("codicilsParagraphs", "Codicils Paragraphs"),
  ],
});
