import mongoose from "mongoose";
import { TOrder } from "./order.inerface";
// import { TOrder } from "./order.inerface";


const orderSchema=new mongoose.Schema<TOrder>({
    email:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quatity:{
        type:Number,
        required:true
    },


})
export const  OrderModel=mongoose.model<TOrder>("order",orderSchema)
