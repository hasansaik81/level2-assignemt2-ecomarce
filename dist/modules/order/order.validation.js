"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
const zod_1 = require("zod");
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    productId: zod_1.z.string().min(1, "Product ID is required"), // Updated here
    price: zod_1.z.number().positive("Price must be a positive number"),
    quantity: zod_1.z.number().int().positive("Quantity must be a positive integer"),
});
exports.orderValidationSchema = orderValidationSchema;
