import { request, Request, Response } from "express";
import { orderServices } from "./order.services";
import { z } from "zod";
import { orderValidationSchema } from "./order.validation";
import { productServices } from "../products/product.services";

const createOrder=async(req:Request,res:Response)=>{
    try{
        const {email,productId,price,quatity}=req.body;
//  check if the product exists
 const product =await productServices. getProductById(productId);
  if(!product){
    return res.status(404).json({
        success:false,
        message:"product not found",
    });
  }
//   check if the requested quatity is available 
if(product.inventroy.quantity){
    return res.status(404).json({
        success:false,
        message:"Insufficient quantity available in invertory",
    });
}
// update the products inventory 
product.inventroy.quantity -=quatity;
product.inventroy.inStock=product.inventroy.quantity>0;
await product.save();

// creat the Order 

const orderData={email,productId,price,quatity};
const validationOrderData=orderValidationSchema.parse(orderData);
const result =await orderServices.createOrderToDb(validationOrderData);
if(!result){
    return res.status(404).json({
        success: false,
        message: "Order not created",
      });
}
res.status(200).json({
    success:true,
    message:"Order Created Successfully",
    data:result,
});
    }catch(error) {
    
        if (error instanceof z.ZodError) {
            return res.status(400).json({
              success: false,
              message: error.issues,
            });
          } else if (error instanceof Error) {
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
          } else {
            res.status(500).json({
              success: false,
              message: "An unknown error occurred",
            });
          }
     }

    };

    const getAllOrders=async(req:Request,res:Response)=>{
        try{
            const { email } = req.query;
            if (email) {
            }
            const result = await orderServices.getAllOrders();
            res.status(200).json({
              success: true,
              message: "Orders fetched successfully!",
              data: result,
            });
        }catch{
            if (Error instanceof Error) {
                if (Error instanceof Error) {
                  res.status(500).json({
                    success: false,
                    message: "Failed to fetch orders",
                    error: Error.message,
                  });
                } else {
                  res.status(500).json({
                    success: false,
                    message: "An unknown error occurred",
                  });
                }
           }
        }
    };
    const searchOrGetAllOrders=async(req:Request,res:Response)=>{
        // cosnt {email}=req.query;
        const {email}=req.query;
           if(email){
        try{
            const result = await orderServices.getOrdersByEmail(email as string);
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
        }catch (error) {
            if(error instanceof Error) {
                res.status(500).json({
                success: false,
                message: "Failed to fetch orders",
                error: error.message,
              });
              }
              res.status(500).json({
                success: false,
                message: "An Unknown error occurred",
              })
        } 
        
    }else{
            getAllOrders(req,res);
        }
    };
export const orderController={
    createOrder,
    getAllOrders,
    searchOrGetAllOrders,
};


