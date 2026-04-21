import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    category: z.string().default("News"),
    excerpt: z.string(),
    publishDate: z.coerce.date(),
    author: z.string().default("Dove Cottage Day Hospice"),
    featuredImage: z.string().optional(),
    featured_image: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

const shops = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    shop_info: z.string(),
    shop_main_image: z.string(),
    opening_hours: z.string(),
    gallery: z.array(z.string()).default([]),
    button_colour: z.string().default("#2d6fb3"),
    phone: z.string(),
    address: z.string(),
    facebook_link: z.string().optional(),
    instagram_link: z.string().optional(),
    html_test: z.string().optional(),
    /** Split hero title, e.g. "Bottesford" + tagline (default "Hospice Shop") */
    hero_location: z.string().optional(),
    hero_tagline: z.string().optional(),
    /** Highlight box below the main story (markdown) */
    callout: z.string().optional(),
    /** Short text for the Visit sidebar (donations accepted) */
    donations_blurb: z.string().optional(),
    /** Optional Google Maps embed `src` from Share → Embed map */
    map_embed_url: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

export const collections = { blog, shops };
