import { z } from "zod";
// Variant Schema

const variantSchema = z.object({
    type: z.string().min(1, "Variant type is required"),
    value: z.string().min(1, "Variant value is required"),
});
// Inventory Schema

const inventorySchema = z.object({
    quantity: z.number().min(0, "Quantity must be at least 0"),
    inStock: z.boolean(),
});
// Product Schema

const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    description: z.string().min(1, "Product description is required"),
    price: z.number().positive("Price must be a positive number"),
    category: z.string().min(1, "Category is required"),
    tags: z.array(z.string().min(1, "Tag must be a non-empty string")).min(1, "Tags array cannot be empty"),
    variants: z.array(variantSchema).min(1, "Variants are required"),
    inventory: inventorySchema,
});




//   export the schema 
export const productValidationSchema=productSchema;
export type ProductValidation=z.infer< typeof productSchema>;
  
