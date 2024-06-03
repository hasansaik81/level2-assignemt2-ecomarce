"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// import { string } from "zod";
// variant schema 
const variantSchema = new mongoose_1.default.Schema({
    type: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        requierd: true,
    },
});
//  inventory Schema 
const invertorySchema = new mongoose_1.default.Schema({
    quantity: {
        type: Number,
        required: true,
    },
    inStock: {
        type: Boolean,
        required: true,
    },
});
const productSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    variants: {
        type: [variantSchema],
        required: true,
    },
    inventory: {
        type: invertorySchema,
        required: true,
    },
});
const ProductModel = mongoose_1.default.model("Product ", productSchema);
exports.ProductModel = ProductModel;
