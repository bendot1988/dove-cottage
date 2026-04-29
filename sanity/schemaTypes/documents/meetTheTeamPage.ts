import { defineField, defineType } from "sanity";

export default defineType({
  name: "meetTheTeamPage",
  title: "Meet The Team Page",
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
    defineField({
      name: "teamGroups",
      title: "Team Groups",
      type: "array",
      of: [
        defineField({
          name: "teamGroup",
          title: "Team Group",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Group Title", type: "string" }),
            defineField({
              name: "members",
              title: "Members",
              type: "array",
              of: [
                defineField({
                  name: "member",
                  title: "Member",
                  type: "object",
                  fields: [
                    defineField({ name: "name", title: "Name", type: "string" }),
                    defineField({ name: "jobTitle", title: "Job Title", type: "string" }),
                    defineField({ name: "photo", title: "Photo URL/Path", type: "string" }),
                    defineField({ name: "photoAlt", title: "Photo Alt", type: "string" }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        defineField({
          name: "stat",
          title: "Stat",
          type: "object",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        defineField({
          name: "testimonial",
          title: "Testimonial",
          type: "object",
          fields: [
            defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
            defineField({ name: "rating", title: "Rating (1-5)", type: "number" }),
            defineField({ name: "authorName", title: "Author Name", type: "string" }),
            defineField({ name: "authorRole", title: "Author Role", type: "string" }),
            defineField({ name: "authorPhoto", title: "Author Photo URL/Path", type: "string" }),
            defineField({ name: "authorPhotoAlt", title: "Author Photo Alt", type: "string" }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "heroH1", subtitle: "pageTitle" },
  },
});
