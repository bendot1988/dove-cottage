import { defineField, defineType } from "sanity";

export const linkItem = defineType({
  name: "linkItem",
  title: "Link Item",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "href", title: "URL", type: "string" }),
  ],
});

export const textBullet = defineType({
  name: "textBullet",
  title: "Text Bullet",
  type: "object",
  fields: [defineField({ name: "text", title: "Text", type: "text", rows: 2 })],
});

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image with Alt Text",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "alt", title: "Alt Text", type: "string" }),
  ],
});
