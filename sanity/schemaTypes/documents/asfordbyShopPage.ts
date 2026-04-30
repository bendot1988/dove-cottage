import { defineField, defineType } from "sanity";

export default defineType({
  name: "asfordbyShopPage",
  title: "Asfordby Shop Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Shop Name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "heroLocation", title: "Hero Location Line", type: "string" }),
    defineField({ name: "heroTagline", title: "Hero Tagline", type: "string", initialValue: "Hospice Shop" }),
    defineField({ name: "shopInfo", title: "Shop Info (Markdown)", type: "text", rows: 8 }),
    defineField({ name: "callout", title: "Callout Box (Markdown)", type: "text", rows: 4 }),
    defineField({ name: "shopMainImage", title: "Shop Main Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "shopMainImageAlt", title: "Shop Main Image Alt", type: "string" }),
    defineField({ name: "openingHours", title: "Opening Hours (Markdown)", type: "text", rows: 6 }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [defineField({ type: "image", options: { hotspot: true } })],
    }),
    defineField({ name: "buttonColour", title: "Button Colour", type: "string", initialValue: "#2751a0" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "address", title: "Address", type: "text" }),
    defineField({ name: "mapEmbedUrl", title: "Map Embed URL", type: "string" }),
    defineField({ name: "donationsBlurb", title: "Donations Blurb", type: "text", rows: 3 }),
    defineField({ name: "facebookLink", title: "Facebook Link", type: "string" }),
    defineField({ name: "instagramLink", title: "Instagram Link", type: "string" }),
    defineField({ name: "htmlTest", title: "Html Test", type: "text", rows: 4 }),
    defineField({ name: "draft", title: "Draft", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: {
      title: "title",
      media: "shopMainImage",
    },
  },
});
