import { defineField, defineType } from "sanity";

export default defineType({
  name: "shop",
  title: "Shops",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Shop Name", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "hero_location", title: "Hero Location Line", type: "string" }),
    defineField({ name: "hero_tagline", title: "Hero Tagline", type: "string", initialValue: "Hospice Shop" }),
    defineField({ name: "shop_info", title: "Shop Info", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "callout", title: "Callout Box", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "shop_main_image", title: "Shop Main Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "opening_hours", title: "Opening Hours", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "gallery", title: "Gallery", type: "array", of: [{ type: "image" }] }),
    defineField({ name: "button_colour", title: "Button Colour", type: "string", initialValue: "#2d6fb3" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "address", title: "Address", type: "text" }),
    defineField({ name: "map_embed_url", title: "Map Embed URL", type: "string" }),
    defineField({ name: "donations_blurb", title: "Donations Blurb", type: "text" }),
    defineField({ name: "facebook_link", title: "Facebook Link", type: "string" }),
    defineField({ name: "instagram_link", title: "Instagram Link", type: "string" }),
    defineField({ name: "html_test", title: "Html Test", type: "text" }),
    defineField({ name: "draft", title: "Draft", type: "boolean", initialValue: false }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }] }),
  ],
});
