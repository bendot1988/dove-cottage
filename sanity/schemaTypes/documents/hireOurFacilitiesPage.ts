import { defineField, defineType } from "sanity";

const imageSourceField = (name: string, title: string) =>
  defineField({
    name,
    title,
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
  });

export default defineType({
  name: "hireOurFacilitiesPage",
  title: "Hire Our Facilities Page",
  type: "document",
  fields: [
    defineField({ name: "pageTitle", title: "Page Title", type: "string" }),
    imageSourceField("heroImage", "Hero Image"),
    defineField({ name: "heroImageAlt", title: "Hero Image Alt", type: "string" }),
    defineField({ name: "parentNavLabel", title: "Back Link Label", type: "string" }),
    defineField({ name: "parentNavHref", title: "Back Link URL", type: "string" }),
    defineField({ name: "heroH1", title: "Hero Heading", type: "string" }),
    defineField({ name: "heroShortDescription", title: "Hero Short Description", type: "text" }),
    defineField({
      name: "introBlocks",
      title: "Intro Paragraphs",
      type: "array",
      of: [{ type: "text" }],
      validation: (rule) => rule.max(6),
    }),
    defineField({
      name: "sections",
      title: "Content Sections",
      type: "array",
      of: [
        defineField({
          name: "facilitySection",
          title: "Section",
          type: "object",
          fields: [
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "subheading", title: "Subheading", type: "text" }),
            defineField({ name: "body", title: "Body", type: "text" }),
            defineField({
              name: "bullets",
              title: "Bullets",
              type: "array",
              of: [{ type: "textBullet" }],
            }),
            defineField({ name: "closing", title: "Closing paragraph", type: "text" }),
          ],
        }),
      ],
    }),
    defineField({ name: "impactHeading", title: "Impact Heading", type: "string" }),
    defineField({ name: "impactBody", title: "Impact Body", type: "text" }),
    defineField({ name: "formHeading", title: "Form Heading", type: "string" }),
    defineField({ name: "formIntro", title: "Form Intro", type: "text" }),
    defineField({ name: "sideFormLinkText", title: "Sidebar Form Link Text", type: "string" }),
    defineField({ name: "sideFormHint", title: "Sidebar Form Hint", type: "text" }),
    defineField({ name: "sidebarPeekTitle", title: "Sidebar Peek Title", type: "string" }),
    defineField({ name: "sidebarPeekViewAllHref", title: "Sidebar Peek View All URL", type: "string" }),
    defineField({ name: "sidebarPeekViewAllLabel", title: "Sidebar Peek View All Label", type: "string" }),
    defineField({
      name: "sidebarPeekCards",
      title: "Sidebar Peek Cards",
      type: "array",
      of: [
        defineField({
          name: "sidebarPeekCard",
          title: "Card",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "href", title: "URL", type: "string" }),
            imageSourceField("image", "Card Image"),
          ],
        }),
      ],
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
                  fields: [imageSourceField("image", "Image"), defineField({ name: "alt", title: "Alt Text", type: "string" })],
                }),
              ],
            }),
          ],
        }),
      ],
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
