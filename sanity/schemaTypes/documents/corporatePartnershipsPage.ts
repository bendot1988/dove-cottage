import { defineField, defineType } from "sanity";

export default defineType({
  name: "corporatePartnershipsPage",
  title: "Corporate Partnerships Page",
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
    defineField({ name: "intro", title: "Intro", type: "text", rows: 2 }),
    defineField({ name: "visionTitle", title: "Vision Title", type: "string" }),
    defineField({ name: "visionBody", title: "Vision Body", type: "text", rows: 4 }),
    defineField({ name: "whatWeDoBody", title: "What We Do Body", type: "text", rows: 4 }),
    defineField({
      name: "missionParagraphs",
      title: "Mission Paragraphs",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({
      name: "ways",
      title: "Ways to Support",
      type: "array",
      of: [
        defineField({
          name: "way",
          title: "Way",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),
    defineField({
      name: "donations",
      title: "More Ways to Get Involved",
      type: "array",
      of: [
        defineField({
          name: "donationWay",
          title: "Donation Way",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "body", title: "Body", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),
    defineField({ name: "sponsorshipBody", title: "Sponsorship Body", type: "text", rows: 3 }),
    defineField({ name: "expectIntro", title: "Further Information Intro", type: "text", rows: 2 }),
    defineField({ name: "ctaBody", title: "CTA Body", type: "text", rows: 3 }),
  ],
  preview: {
    select: { title: "heroH1", subtitle: "pageTitle" },
  },
});
