import mongoose from "mongoose";



//creation of schema

const productSchema= new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:Array,required:true},
    category:{type:String,required:true},
    subcategory:{type:String,required:true},
    sizes:{type:Array,required:true},
    bestseller:{type:Boolean},
    date:{type:Number,required:true},
})

//every time your backend restarts, Mongoose will try to redefine the same model, leading to an error
const productModel= mongoose.models.product|| mongoose.model("product",productSchema);

export default productModel