"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_services_1 = require("./order.services");
const zod_1 = require("zod");
const order_validation_1 = require("./order.validation");
const product_services_1 = require("../products/product.services");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, productId, price, quatity } = req.body;
        //  check if the product exists
        const product = yield product_services_1.productServices.getProductById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "product not found",
            });
        }
        //   check if the requested quatity is available 
        if (product.inventory.quantity) {
            return res.status(404).json({
                success: false,
                message: "Insufficient quantity available in invertory",
            });
        }
        // update the products inventory 
        product.inventory.quantity -= quatity;
        product.inventory.inStock = product.inventory.quantity > 0;
        yield product.save();
        // creat the Order 
        const orderData = { email, productId, price, quatity };
        const validationOrderData = order_validation_1.orderValidationSchema.parse(orderData);
        const result = yield order_services_1.orderServices.createOrderToDb(validationOrderData);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Order not created",
            });
        }
        res.status(200).json({
            success: true,
            message: "Order Created Successfully",
            data: result,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                success: false,
                message: error.issues,
            });
        }
        else if (error instanceof Error) {
            if (error.name === "ValidationError") {
                return res.status(400).json({
                    success: false,
                    message: error.message,
                });
            }
            res.status(500).json({
                success: false,
                message: "Failed to create order",
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "An unknown error occurred",
            });
        }
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_services_1.orderServices.getAllOrders();
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: "Failed to fetch orders",
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "An unknown error occurred",
            });
        }
    }
});
const searchOrGetAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // cosnt {email}=req.query;
    const { email } = req.query;
    if (email) {
        try {
            const result = yield order_services_1.orderServices.getOrdersByEmail(email);
            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: `No orders found matching email '${email}'`,
                });
            }
            res.json({
                success: true,
                message: `Orders matching email '${email}' fetched successfully!`,
                data: result,
            });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    success: false,
                    message: "Failed to fetch orders",
                    error: error.message,
                });
            }
            res.status(500).json({
                success: false,
                message: "An Unknown error occurred",
            });
        }
    }
    else {
        getAllOrders(req, res);
    }
});
exports.orderController = {
    createOrder,
    getAllOrders,
    searchOrGetAllOrders,
};
