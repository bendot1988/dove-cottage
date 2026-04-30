import { defineField, defineType } from "sanity";

const textListField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [defineField({ type: "object", fields: [defineField({ name: "text", title: "Text", type: "string" })] })],
  });

const sectionImageField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
      defineField({ name: "alt", title: "Alt Text", type: "string" }),
    ],
  });

export default defineType({
  name: "bereavementSupportPage",
  title: "Bereavement Support Page",
  type: "document",
  fields: [
    defineField({ name: "pageTitle", title: "Page Title", type: "string" }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroImageAlt", title: "Hero Image Alt", type: "string" }),
    defineField({ name: "parentNavLabel", title: "Back Link Label", type: "string" }),
    defineField({ name: "parentNavHref", title: "Back Link URL", type: "string" }),
    defineField({ name: "heroH1", title: "Hero Heading", type: "string" }),
    defineField({ name: "heroShortDescription", title: "Hero Short Description", type: "text", rows: 2 }),
    defineField({ name: "mainIntro1", title: "Intro Paragraph 1", type: "text", rows: 4 }),
    defineField({ name: "mainIntro2", title: "Intro Paragraph 2", type: "text", rows: 3 }),
    defineField({ name: "whoHeading", title: "Who Heading", type: "string" }),
    textListField("whoList", "Who List"),
    defineField({ name: "callout", title: "Callout", type: "text", rows: 3 }),
    defineField({ name: "anticipatoryHeading", title: "Anticipatory Heading", type: "string" }),
    defineField({ name: "anticipatoryBody1", title: "Anticipatory Body 1", type: "text", rows: 4 }),
    defineField({ name: "anticipatoryBody2", title: "Anticipatory Body 2", type: "text", rows: 4 }),
    defineField({ name: "nurseHeading", title: "Nurse Heading", type: "string" }),
    defineField({ name: "nurseIntro", title: "Nurse Intro", type: "text", rows: 3 }),
    defineField({ name: "nurseListIntro", title: "Nurse List Intro", type: "string" }),
    textListField("nurseList", "Nurse List"),
    defineField({ name: "nurseFoot", title: "Nurse Footnote", type: "text", rows: 2 }),
    defineField({ name: "dropInHeading", title: "Drop-In Heading", type: "string" }),
    defineField({ name: "dropInIntro", title: "Drop-In Intro", type: "text", rows: 3 }),
    defineField({
      name: "dropInGroups",
      title: "Drop-In Groups",
      type: "array",
      of: [
        defineField({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            textListField("bullets", "Bullets"),
          ],
        }),
      ],
    }),
    defineField({ name: "dropInFoot", title: "Drop-In Footnote", type: "text", rows: 3 }),
    defineField({ name: "counsellingHeading", title: "Counselling Heading", type: "string" }),
    defineField({ name: "counsellingBody", title: "Counselling Body", type: "text", rows: 3 }),
    defineField({ name: "counsellingCta", title: "Counselling CTA Label", type: "string" }),
    defineField({ name: "counsellingCtaHref", title: "Counselling CTA URL", type: "string" }),
    defineField({ name: "sideFormLinkText", title: "Side Form Link Text", type: "string" }),
    defineField({ name: "sideFormHint", title: "Side Form Hint", type: "text", rows: 2 }),
    defineField({
      name: "sectionImages",
      title: "Section Images",
      type: "object",
      fields: [
        sectionImageField("afterIntro", "After Intro"),
        sectionImageField("afterCallout", "After Callout"),
        sectionImageField("beforeSupportGroups", "Before Support Groups"),
      ],
    }),
  ],
  preview: {
    select: { title: "heroH1", subtitle: "pageTitle" },
  },
});
