import express from'express';
import {placeOrder,placeOrderRazorpay,placeOrderStripe,allOrders,updateStatus,userOrders} from '../controllers/orderController.js'
import adminAuth from '../middleware/admiAuth.js'
import authUser from '../middleware/auth.js'
const orderRouter=express.Router()
//admin features
orderRouter.post('/list',adminAuth ,allOrders)
orderRouter.post('/status',adminAuth ,updateStatus)

//paymentfeatures
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

//user feature
orderRouter.post('/userorders',authUser,userOrders)

export default orderRouter;