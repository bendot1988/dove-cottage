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
    draft: z.boolean().default(false)
  })
});

export const collections = { blog, shops };
