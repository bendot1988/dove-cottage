import { defineField, defineType } from "sanity";

export default defineType({
  name: "eventPost",
  title: "Events",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Event Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "category", title: "Category", type: "string", initialValue: "Event" }),
    defineField({ name: "excerpt", title: "Short Summary", type: "text" }),
    defineField({ name: "eventDate", title: "Event Start Date", type: "date", validation: (rule) => rule.required() }),
    defineField({ name: "eventEndDate", title: "Event End Date (optional)", type: "date" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "featuredImage", title: "Featured Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "bookingUrl", title: "Booking URL (optional)", type: "string" }),
    defineField({ name: "draft", title: "Draft", type: "boolean", initialValue: false }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        defineField({
          name: "inlineImage",
          title: "Image",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt text", type: "string" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        }),
      ],
    }),
  ],
});
