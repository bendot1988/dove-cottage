import { defineField, defineType } from "sanity";

export default defineType({
  name: "newsPost",
  title: "News",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "category", title: "Category", type: "string", initialValue: "News" }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text" }),
    defineField({ name: "publishDate", title: "Publish Date", type: "date" }),
    defineField({ name: "author", title: "Author", type: "string", initialValue: "Dove Cottage Day Hospice" }),
    defineField({ name: "eventDate", title: "Event Date (optional)", type: "date" }),
    defineField({ name: "eventEndDate", title: "Event End Date (optional)", type: "date" }),
    defineField({ name: "eventLocation", title: "Event Location (optional)", type: "string" }),
    defineField({ name: "featuredImage", title: "Featured Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "draft", title: "Draft", type: "boolean", initialValue: false }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }] }),
  ],
});
