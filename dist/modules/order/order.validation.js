"use strict";
// import { z } from "zod";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchema = void 0;
// const orderValidationSchema = z.object({
//   email: z.string().email("Invalid email address"),
//   productId: z.string().nonempty("Product ID is required"),
//   price: z.number().positive("Price must be a positive number"),
//   quantity: z.number().int().positive("Quantity must be a positive integer"),
// });
// export { orderValidationSchema };
const zod_1 = require("zod");
const orderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    productId: zod_1.z.string().min(1, "Product ID is required"),
    price: zod_1.z.number().positive("Price must be a positive number"),
    quantity: zod_1.z.number().int().positive("Quantity must be a positive integer"),
});
exports.orderValidationSchema = orderValidationSchema;
