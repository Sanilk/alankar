import type { CollectionConfig } from "payload";

export const Pages: CollectionConfig = {
  slug: "pages",

  access: {
    read: () => true,
  },

  admin: {
    useAsTitle: "title",
  },

  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },

    // 🔥 HERO SECTION
    {
      name: "hero",
      type: "group",
      fields: [
        {
          name: "heading",
          type: "text",
        },
        {
          name: "subheading",
          type: "text",
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
      ],
    },

    // 🧵 CATEGORIES
    {
      name: "categories",
      type: "array",
      fields: [
        {
          name: "name",
          type: "text",
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
      ],
    },

    // 💬 TESTIMONIALS
    {
      name: "testimonials",
      type: "array",
      fields: [
        { name: "name", type: "text" },
        { name: "text", type: "textarea" },
        { name: "city", type: "text" },
      ],
    },

    // 🧠 SLUG (IMPORTANT)
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
  ],
};