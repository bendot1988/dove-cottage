import { defineField, defineType } from "sanity";

export default defineType({
  name: "volunteerYourTimePage",
  title: "Volunteer Your Time Page",
  type: "document",
  fields: [
    defineField({ name: "pageTitle", title: "Page Title", type: "string" }),
    defineField({ name: "heroImage", title: "Hero Image URL/Path", type: "string" }),
    defineField({ name: "heroImageAlt", title: "Hero Image Alt", type: "string" }),
    defineField({ name: "parentNavLabel", title: "Back Link Label", type: "string" }),
    defineField({ name: "parentNavHref", title: "Back Link URL", type: "string" }),
    defineField({ name: "heroH1", title: "Hero Heading", type: "string" }),
    defineField({ name: "heroShortDescription", title: "Hero Short Description", type: "text", rows: 2 }),
    defineField({ name: "introHeading", title: "Intro Heading", type: "string" }),
    defineField({ name: "introParagraph1", title: "Intro Paragraph 1", type: "text", rows: 3 }),
    defineField({ name: "introParagraph2", title: "Intro Paragraph 2", type: "text", rows: 3 }),
    defineField({
      name: "sectionImage",
      title: "Section Image",
      type: "object",
      fields: [
        defineField({ name: "src", title: "Image URL/Path", type: "string" }),
        defineField({ name: "alt", title: "Image Alt", type: "string" }),
      ],
    }),
    defineField({ name: "waysHeading", title: "Ways Heading", type: "string" }),
    defineField({ name: "waysIntro", title: "Ways Intro", type: "text", rows: 3 }),
    defineField({
      name: "roles",
      title: "Roles",
      type: "array",
      of: [
        defineField({
          name: "role",
          title: "Role",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            defineField({ name: "pdfLabel", title: "PDF Label", type: "string" }),
            defineField({ name: "pdfFile", title: "PDF File URL", type: "string" }),
            defineField({ name: "pdfHref", title: "PDF Href (legacy)", type: "string" }),
            defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
            defineField({ name: "ctaHref", title: "CTA URL", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({ name: "expectHeading", title: "Expect Heading", type: "string" }),
    defineField({ name: "expectParagraph1", title: "Expect Paragraph 1", type: "text", rows: 3 }),
    defineField({ name: "expectParagraph2", title: "Expect Paragraph 2", type: "text", rows: 3 }),
    defineField({ name: "expectParagraph3", title: "Expect Paragraph 3", type: "text", rows: 3 }),
    defineField({ name: "volunteerFormHeading", title: "Volunteer Form Heading", type: "string" }),
    defineField({ name: "volunteerFormIntro", title: "Volunteer Form Intro", type: "text", rows: 2 }),
    defineField({ name: "beaconAccount", title: "Beacon Account", type: "string" }),
    defineField({ name: "beaconVolunteerFormId", title: "Beacon Volunteer Form ID", type: "string" }),
    defineField({ name: "sideFormLinkText", title: "Side Form Link Text", type: "string" }),
    defineField({ name: "sideFormHint", title: "Side Form Hint", type: "text", rows: 2 }),
  ],
  preview: {
    select: { title: "heroH1", subtitle: "pageTitle" },
  },
});
