

import { z } from "zod";

const orderValidationSchema = z.object({
  email: z.string().email("Invalid email address"),
  productId: z.string().min(1, "Product ID is required"),  // Updated here
  price: z.number().positive("Price must be a positive number"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
});

export { orderValidationSchema };


