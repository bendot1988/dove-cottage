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
      }),
    ],
  });

export default defineType({
  name: "supportGroupsPage",
  title: "Support Groups Page",
  type: "document",
  fields: [
    defineField({ name: "pageTitle", title: "Page Title", type: "string" }),
    imageSourceField("heroImage", "Hero Image"),
    defineField({ name: "heroImageAlt", title: "Hero Image Alt", type: "string" }),
    defineField({ name: "parentNavLabel", title: "Back Link Label", type: "string" }),
    defineField({ name: "parentNavHref", title: "Back Link URL", type: "string" }),
    defineField({ name: "heroH1", title: "Hero Heading", type: "string" }),
    defineField({ name: "heroShortDescription", title: "Hero Short Description", type: "text" }),
    defineField({ name: "mainIntro1", title: "Main Intro", type: "text" }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        defineField({
          name: "supportCard",
          title: "Card",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "excerpt", title: "Excerpt", type: "text" }),
            imageSourceField("image", "Card Image"),
            defineField({ name: "imageAlt", title: "Card Image Alt", type: "string" }),
            defineField({ name: "badge", title: "Badge", type: "string" }),
            defineField({ name: "stat", title: "Stat", type: "string" }),
            defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
            defineField({ name: "href", title: "CTA URL", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({ name: "referralIntro", title: "Referral Intro", type: "string" }),
    defineField({ name: "referralCta", title: "Referral CTA Label", type: "string" }),
    defineField({ name: "referralCtaHref", title: "Referral CTA URL", type: "string" }),
    defineField({ name: "referralOutro", title: "Referral Outro", type: "string" }),
  ],
  preview: {
    select: {
      title: "heroH1",
      subtitle: "pageTitle",
      media: "heroImage.image",
    },
  },
});
