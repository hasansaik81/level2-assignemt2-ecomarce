import { TOrder } from "./order.inerface";
import { OrderModel } from "./order.models";

const createOrderToDb=async(payload:TOrder)=>{
    const result=await OrderModel.create(payload);
    return result
};

const getAllOrders=async()=>{
    const result=await OrderModel.find({});
    return result
};

const getOrdersByEmail=async(email:string)=>{
    const result=await OrderModel.find({email});
    return result;
};

export const  orderSevices={
    createOrderToDb,
    getAllOrders,
    getOrdersByEmail
};