import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
    slug: "products",

    admin: {
        useAsTitle: "name",
    },

    access: {
        read: () => true, // allow public read
    },

    fields: [
        {
            name: "name",
            type: "text",
            required: true,
        },
        {
            name: "price",
            type: "number",
            required: true,
        },
        {
            name: "image",
            type: "upload",
            relationTo: "media",
            required: true,
        },
        {
            name: "description",
            type: "textarea",
        },
        {
            name: "details",
            type: "textarea",
        },
        {
            name: "sizes",
            type: "array",
            fields: [
                {
                    name: "value",
                    type: "text",
                },
            ],
        },
        {
            name: "inStock",
            type: "checkbox",
            defaultValue: true,
        },
        {
            name: "quantityAvailable",
            type: "number",
            defaultValue: 0,
        },
        {
            name: "discount",
            type: "number",
        },
        {
            name: "featured",
            type: "checkbox",
        },
        {
            name: "slug",
            type: "text",
            required: true,
            unique: true,
            admin: {
                position: "sidebar",
            },
            hooks: {
                beforeValidate: [
                    ({ value, data }) => {
                        if (!value && data?.name) {
                            return data.name
                                .toLowerCase()
                                .replace(/[^a-z0-9]+/g, "-")
                                .replace(/(^-|-$)+/g, "");
                        }

                        return value;
                    },
                ],
            },
        },
    ],
};