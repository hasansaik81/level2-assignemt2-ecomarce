import { ProductModel } from "./product.model";
import { TProduct } from "./products.interface";

const createProduct=async(payload:TProduct)=>{
    const result=await ProductModel.create(payload);
    return result
};
const getAllProducts=async()=>{
    const result=await ProductModel.find({});
    return result
};
const getProductById=async(productId:string)=>{
    const result=await ProductModel.findById(productId);
    return result
};
const updateProductById=async(productId:string,payload:TProduct)=>{
    const result=await ProductModel.findByIdAndUpdate(productId,payload,{new:true,});
    return result
};

const deleteProductById=async(productId:string)=>{
    const result=await ProductModel.findByIdAndDelete(productId);
    return result
};

const searchProducts=async(searchTerm:string)=>{
    const regex=new RegExp(searchTerm,'i'); 
    const result=await ProductModel.find({
        $or:[
            {name:{$regex:regex}},
            { description: { $regex: regex } },
            { category: { $regex: regex } },
            { tags: { $regex: regex } },
        ]
    });
    return result
};

export const productServices={
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById,
    searchProducts
};