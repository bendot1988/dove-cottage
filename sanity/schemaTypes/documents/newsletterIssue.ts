import { defineField, defineType } from "sanity";

export default defineType({
  name: "newsletterIssue",
  title: "Newsletters",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "issueDate", title: "Issue Date", type: "date" }),
    defineField({
      name: "file",
      title: "PDF File",
      type: "object",
      fields: [
        defineField({
          name: "assetFile",
          title: "Uploaded PDF",
          type: "file",
        }),
        defineField({
          name: "legacyUrl",
          title: "Legacy URL/Path",
          type: "string",
          description: "Old migration value. Prefer uploading a PDF instead.",
        }),
      ],
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true;
          if (value.assetFile?.asset?._ref || value.legacyUrl?.trim()) return true;
          return "If PDF File is set, upload a PDF or provide a legacy URL.";
        }),
    }),
    defineField({
      name: "externalLink",
      title: "External Link (optional)",
      type: "string",
      description: "Use this instead of a PDF when the newsletter lives on another website.",
    }),
    defineField({ name: "fileLabel", title: "Download Label", type: "string", initialValue: "Download PDF" }),
    defineField({ name: "excerpt", title: "Summary (optional)", type: "text" }),
    defineField({ name: "draft", title: "Draft", type: "boolean", initialValue: false }),
    defineField({ name: "body", title: "Editor Notes", type: "array", of: [{ type: "block" }] }),
  ],
  validation: (rule) =>
    rule.custom((doc) => {
      const hasPdf = Boolean(doc?.file?.assetFile?.asset?._ref || doc?.file?.legacyUrl?.trim());
      const hasLink = Boolean(doc?.externalLink?.trim());
      if (hasPdf || hasLink) return true;
      return "Add either a PDF file (or legacy URL) or an external link.";
    }),
});
