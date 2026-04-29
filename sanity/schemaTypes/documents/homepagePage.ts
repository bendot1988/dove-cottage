import { defineField, defineType } from "sanity";

export default defineType({
  name: "homepagePage",
  title: "Homepage Page",
  type: "document",
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
        defineField({
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "ctas",
          title: "Buttons",
          type: "array",
          of: [
            defineField({
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "href", title: "URL", type: "string" }),
                defineField({ name: "style", title: "Style", type: "string" }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "careServices",
      title: "Care Services Section",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
      ],
    }),
    defineField({
      name: "videoFeature",
      title: "Video Feature Section",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "youtubeId", title: "YouTube ID", type: "string" }),
      ],
    }),
    defineField({
      name: "shopsSection",
      title: "Shops Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
        defineField({ name: "vintedUrl", title: "Vinted URL", type: "string" }),
        defineField({ name: "ebayUrl", title: "Ebay URL", type: "string" }),
        defineField({
          name: "sunflowerImage",
          title: "Sunflower Image",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: "reachSection",
      title: "Reach Section",
      type: "object",
      fields: [
        defineField({
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: "supportSection",
      title: "Support Section",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
        defineField({
          name: "backgroundFlowerLeft",
          title: "Left Flower",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "backgroundFlowerRight",
          title: "Right Flower",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "cards",
          title: "Cards",
          type: "array",
          of: [
            defineField({
              type: "object",
              fields: [
                defineField({ name: "icon", title: "Icon", type: "image", options: { hotspot: false } }),
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
                defineField({ name: "buttonLabel", title: "Button Label", type: "string" }),
                defineField({ name: "buttonLink", title: "Button URL", type: "string" }),
                defineField({ name: "buttonVariant", title: "Button Variant", type: "string" }),
                defineField({ name: "featured", title: "Featured", type: "boolean" }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage" };
    },
  },
});
