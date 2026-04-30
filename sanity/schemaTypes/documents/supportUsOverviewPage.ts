import { defineField, defineType } from "sanity";

export default defineType({
  name: "supportUsOverviewPage",
  title: "Support Us Overview Page",
  type: "document",
  fields: [
    defineField({ name: "pageTitle", title: "Page Title", type: "string" }),
    defineField({ name: "heroImage", title: "Hero Image URL/Path", type: "string" }),
    defineField({ name: "heroImageAlt", title: "Hero Image Alt", type: "string" }),
    defineField({ name: "parentNavLabel", title: "Back Link Label", type: "string" }),
    defineField({ name: "parentNavHref", title: "Back Link URL", type: "string" }),
    defineField({ name: "heroH1", title: "Hero Heading", type: "string" }),
    defineField({ name: "heroShortDescription", title: "Hero Description", type: "text", rows: 3 }),
    defineField({ name: "introEyebrow", title: "Intro Eyebrow", type: "string" }),
    defineField({ name: "introHeading", title: "Intro Heading", type: "string" }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        defineField({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
            defineField({ name: "image", title: "Image URL/Path", type: "string" }),
            defineField({ name: "imageAlt", title: "Image Alt", type: "string" }),
            defineField({ name: "badge", title: "Badge", type: "string" }),
            defineField({ name: "stat", title: "Stat", type: "string" }),
            defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
            defineField({ name: "href", title: "CTA URL", type: "string" }),
          ],
        }),
      ],
    }),
  ],
});
