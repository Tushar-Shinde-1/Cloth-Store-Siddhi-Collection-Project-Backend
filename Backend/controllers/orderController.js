//placing order with COD method
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const placeOrder=async (req,res)=>
{

    try {
        const{userId,items,amount,address}=req.body;
        const orderData={userId,items,address,amount,paymentMethod:"COD",
        date:Date.now()};

        const newOrder=new orderModel(orderData)
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId,{cartData:{}})
        res.json({success:true,message:"Order Placed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
//placing order with stripe method

const placeOrderStripe=async (req,res)=>
    {
        
    }
    //placing order with razorpay method

const placeOrderRazorpay=async (req,res)=>
    {
        
    }

    //all orders data for admin pane;
    const allOrders=async(req,res)=>
    {

        try {
            const orders=await orderModel.find({})
            res.json({success:true,orders})
            
        } catch (error) {
            console.log(error);
            res.json({success:false,message:error.message})
        }
    }

     //all orders data for particular user pane;
     const userOrders=async(req,res)=>
        {
            
            try {
                const {userId}=req.body;
                const orders=await orderModel.find({userId})
                res.json({success:true,orders})

            } catch (error) {
                console.log(error);
                res.json({success:false,message:error.message})
                
            }
        }

         //oorder status from admin panel;
     const updateStatus=async(req,res)=>
        {
           try {
            const {orderId, status}=req.body;
            const orders=await orderModel.findByIdAndUpdate(orderId,{status})
            console.log(orders)
            res.json({success:true, orders})
            
           } catch (error) {
            console.log(error);
             res.json({success:false,message:error.message})
           }
            
        }

        export {placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,updateStatus,userOrders}