import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",

  access: {
    read: () => true, // ✅ public access
  },

  upload: {
    staticDir: "media", // ✅ files stored in /media folder

    mimeTypes: ["image/*"], // ✅ restrict to images only

    imageSizes: [
      {
        name: "thumbnail",
        width: 300,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 600,
        height: 800,
        position: "centre",
      },
    ],
  },

  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};