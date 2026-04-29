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
          if (!value) return "Please upload a PDF or provide a legacy URL.";
          if (value.assetFile?.asset?._ref || value.legacyUrl?.trim()) return true;
          return "Please upload a PDF or provide a legacy URL.";
        }),
    }),
    defineField({ name: "fileLabel", title: "Download Label", type: "string", initialValue: "Download PDF" }),
    defineField({ name: "excerpt", title: "Summary (optional)", type: "text" }),
    defineField({ name: "draft", title: "Draft", type: "boolean", initialValue: false }),
    defineField({ name: "body", title: "Editor Notes", type: "array", of: [{ type: "block" }] }),
  ],
});
