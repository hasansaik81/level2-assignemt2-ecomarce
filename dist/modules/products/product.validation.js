"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = void 0;
const zod_1 = require("zod");
// Variant Schema
const variantSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, "Variant type is required"),
    value: zod_1.z.string().min(1, "Variant value is required"),
});
// Inventory Schema
const inventorySchema = zod_1.z.object({
    quantity: zod_1.z.number().min(0, "Quantity must be at least 0"),
    inStock: zod_1.z.boolean(),
});
// Product Schema
const productSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Product name is required"),
    description: zod_1.z.string().min(1, "Product description is required"),
    price: zod_1.z.number().positive("Price must be a positive number"),
    category: zod_1.z.string().min(1, "Category is required"),
    tags: zod_1.z.array(zod_1.z.string().min(1, "Tag must be a non-empty string")).min(1, "Tags array cannot be empty"),
    variants: zod_1.z.array(variantSchema).min(1, "Variants are required"),
    inventory: inventorySchema,
});
//   export the schema 
exports.productValidationSchema = productSchema;
