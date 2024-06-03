"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const product_route_1 = require("./modules/products/product.route");
const order_router_1 = require("./modules/order/order.router");
const app = (0, express_1.default)();
// parser 
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// get route  access 
app.get("/", (_req, res) => {
    res.send("welcome to e-Commarce Backend");
});
// routes 
app.use("/api/products", product_route_1.productRoute);
app.use("/api/orders", order_router_1.orderRoute);
// app.get('/',(req,res)=>{
//   res.send('500 is continue')  
// })
// app.listen(5000,()=>{
//     console.log('server is running')
// })
exports.default = app;
