"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = void 0;
const zod_1 = require("zod");
// Variant Schema
const variantSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, "Variant type is required"), // Updated here
    value: zod_1.z.string().min(1, "Variant value is required"), // Updated here
});
// Inventory Schema
const inventorySchema = zod_1.z.object({
    quantity: zod_1.z.number().min(0, "Quantity must be at least 0"),
    inStock: zod_1.z.boolean(),
});
// Product Schema
const productSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Product name is required"), // Updated here
    description: zod_1.z.string().min(1, "Product description is required"), // Updated here
    price: zod_1.z.number().positive("Price must be a positive number"),
    category: zod_1.z.string().min(1, "Category is required"), // Updated here
    tags: zod_1.z.array(zod_1.z.string().min(1, "Tag must be a non-empty string")), // Updated here
    variants: zod_1.z.array(variantSchema).min(1, "Variants are required"), // Updated here
    inventory: inventorySchema,
});
// Export the schema and types
exports.productValidationSchema = productSchema;
