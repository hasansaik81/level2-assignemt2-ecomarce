
import cors from "cors"
import express, { Request, Response } from "express"
import { productRoute } from "./modules/products/product.route";
import { orderRoute } from "./modules/order/order.router";
const app=express();

// parser 
app.use(express.json());
app.use(cors());

// get route  access 
app.get("/",(_req:Request,res:Response)=>{
    res.send("welcome to e-Commarce Backend");
});

// routes 
app.use("/api/products",productRoute);
app.use("/api/orders",orderRoute) ;
// app.get('/',(req,res)=>{
//   res.send('500 is continue')  
// })
// app.listen(5000,()=>{
//     console.log('server is running')
// })
export default app;