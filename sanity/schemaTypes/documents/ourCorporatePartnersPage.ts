import { defineField, defineType } from "sanity";

export default defineType({
  name: "ourCorporatePartnersPage",
  title: "Our Corporate Partners Page",
  type: "document",
  fields: [
    defineField({ name: "pageTitle", title: "Page Title", type: "string" }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "text", rows: 3 }),
    defineField({ name: "heroImage", title: "Hero Image URL/Path", type: "string" }),
    defineField({ name: "heroImageAlt", title: "Hero Image Alt", type: "string" }),
    defineField({ name: "parentNavLabel", title: "Back Link Label", type: "string" }),
    defineField({ name: "parentNavHref", title: "Back Link URL", type: "string" }),
    defineField({ name: "heroH1", title: "Hero Heading", type: "string" }),
    defineField({ name: "heroShortDescription", title: "Hero Short Description", type: "text", rows: 2 }),
    defineField({ name: "introParagraph1", title: "Intro Paragraph 1", type: "text", rows: 3 }),
    defineField({ name: "introParagraph2", title: "Intro Paragraph 2", type: "text", rows: 3 }),
    defineField({
      name: "partners",
      title: "Partners",
      type: "array",
      of: [
        defineField({
          name: "partner",
          title: "Partner",
          type: "object",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "logo", title: "Logo URL/Path", type: "string" }),
            defineField({ name: "logoAlt", title: "Logo Alt", type: "string" }),
            defineField({ name: "website", title: "Website", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({ name: "closingParagraph", title: "Closing Paragraph", type: "text", rows: 3 }),
    defineField({ name: "closingCtaLabel", title: "Closing CTA Label", type: "string" }),
    defineField({ name: "closingCtaHref", title: "Closing CTA URL", type: "string" }),
  ],
  preview: {
    select: { title: "heroH1", subtitle: "pageTitle" },
  },
});
