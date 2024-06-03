import express from "express"

import { productController } from "./product.controlller";


const router=express.Router();

router.post("/",productController.createProduct);

router.get("/",productController.searchOrGetAllProducts);
router.get("/:productId",productController.getProductById)
router.put("/:productId",productController.updateProductById);
router.delete("/:productId",productController.deleteProductById);
export const productRoute=router;