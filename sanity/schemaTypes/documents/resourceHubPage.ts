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
  name: "resourceHubPage",
  title: "Resource Hub Page",
  type: "document",
  fields: [
    defineField({ name: "pageTitle", title: "Page Title", type: "string" }),
    imageSourceField("heroImage", "Hero Image"),
    defineField({ name: "heroImageAlt", title: "Hero Image Alt", type: "string" }),
    defineField({ name: "parentNavLabel", title: "Back Link Label", type: "string" }),
    defineField({ name: "parentNavHref", title: "Back Link URL", type: "string" }),
    defineField({ name: "heroH1", title: "Hero Heading", type: "string" }),
    defineField({ name: "heroShortDescription", title: "Hero Short Description", type: "text" }),
    defineField({ name: "introHeading", title: "Intro Heading", type: "string" }),
    defineField({ name: "mainIntro1", title: "Main Intro 1", type: "text" }),
    defineField({ name: "mainIntro2", title: "Main Intro 2", type: "text" }),
    defineField({ name: "mainIntro3", title: "Main Intro 3", type: "text" }),
    defineField({ name: "mainIntro4", title: "Main Intro 4", type: "text" }),
    defineField({
      name: "resources",
      title: "Resources",
      type: "array",
      of: [
        defineField({
          name: "resourceItem",
          title: "Resource Item",
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({ name: "organisation", title: "Organisation", type: "string" }),
            defineField({ name: "category", title: "Category", type: "string" }),
            defineField({ name: "resourceType", title: "Resource Type", type: "string" }),
            defineField({ name: "url", title: "External URL", type: "string" }),
            defineField({ name: "file", title: "File URL", type: "string" }),
            defineField({ name: "downloadFile", title: "Download File URL", type: "string" }),
            defineField({ name: "linkLabel", title: "Link Label", type: "string" }),
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
