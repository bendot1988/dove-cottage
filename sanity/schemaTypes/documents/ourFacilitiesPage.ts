import { defineField, defineType } from "sanity";

export default defineType({
  name: "ourFacilitiesPage",
  title: "Our Facilities Page",
  type: "document",
  fields: [
    defineField({ name: "pageTitle", title: "Page Title", type: "string", initialValue: "Our Facilities | Dove Cottage" }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "object",
      fields: [
        defineField({
          name: "image",
          title: "Uploaded image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "legacyUrl",
          title: "Legacy URL/Path",
          type: "string",
          description: "Old migration value. Prefer uploading a proper image instead.",
        }),
      ],
    }),
    defineField({ name: "heroImageAlt", title: "Hero Image Alt", type: "string" }),
    defineField({ name: "parentNavLabel", title: "Back Link Label", type: "string", initialValue: "About Us" }),
    defineField({ name: "parentNavHref", title: "Back Link URL", type: "string", initialValue: "/explore/" }),
    defineField({ name: "heroH1", title: "Hero Title", type: "string", initialValue: "Our Facilities" }),
    defineField({ name: "heroShortDescription", title: "Hero Description", type: "text" }),
    defineField({
      name: "introBlocks",
      title: "Intro Paragraphs",
      type: "array",
      of: [{ type: "text" }],
      validation: (rule) => rule.min(1).max(4),
    }),
    defineField({
      name: "gallerySections",
      title: "Gallery Sections",
      type: "array",
      of: [
        defineField({
          name: "gallerySection",
          title: "Gallery Section",
          type: "object",
          fields: [
            defineField({ name: "heading", title: "Section Heading", type: "string" }),
            defineField({
              name: "images",
              title: "Images",
              type: "array",
              of: [
                defineField({
                  name: "imageItem",
                  title: "Image",
                  type: "object",
                  fields: [
                    defineField({
                      name: "image",
                      title: "Uploaded image",
                      type: "image",
                      options: { hotspot: true },
                    }),
                    defineField({
                      name: "legacyUrl",
                      title: "Legacy URL/Path",
                      type: "string",
                      description: "Old migration value. Prefer uploading a proper image instead.",
                    }),
                    defineField({ name: "alt", title: "Alt Text", type: "string" }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: "heroH1",
      subtitle: "pageTitle",
      media: "heroImage.image",
    },
  },
});
