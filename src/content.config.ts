import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    publishDate: z.coerce.date(),
    author: z.string().default("Dove Cottage Day Hospice"),
    featuredImage: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

export const collections = { blog };
