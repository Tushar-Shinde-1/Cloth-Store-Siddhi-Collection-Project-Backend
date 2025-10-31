import  axios  from 'axios'
import React, { useState } from 'react'
import TItle from '../components/TItle'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { useContext } from 'react'

const PlaceOrder = () => {
  const {navigate,backendUrl,token,cartItem, setCartItem,getCartAmount,delivery_fee,products}=useContext(ShopContext);
  const [method, setMethod] = useState('cod');  // ✅ fixed useState
  const [formdata,setFormData]=useState({
    firstName:'',lastName:'',email:'',street:'',city:'',state:'',zipcode:'',country:'',phone:''
  })

  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setFormData(data=>({...data,[name]:value}))
  }


  const onSubmitHandler=async(event)=>
  {
event.preventDefault()
try {
  let orderItems=[]
  for(const items in cartItem)
  {
    for (const item in cartItem[items])
    {
      if(cartItem[items][item]>0)
      {
        const itemInfo=structuredClone(products.find(product=>product._id=== items))
        if(itemInfo)
        {
          itemInfo.size=item;
          itemInfo.quantity=cartItem[items][item];
          orderItems.push(itemInfo)
        }
      }
    }
  }

  let orderData={
    address:formdata,
    items:orderItems,
    amount:getCartAmount()+delivery_fee
  }
  switch(method)
  {
    //api calls for cashon delivery
    case 'cod':
      const response=await axios.post(backendUrl+'/api/order/place',orderData,{headers:{token}});
      console.log(response.data.success)
      if(response.data.success)
      {
        setCartItem({})
        navigate('/orders')
      }
      else{
        toast.error(response,data.message)
      }
      break;
    default:
      break;
  }
  // console.log("Cart Items: ", cartItem);

  // console.log(orderItems);
  
} catch (error) {
  console.log(error);
  toast.error(error.message)

}
  }
  return (
    <form onSubmit={onSubmitHandler} className="pt-5 sm:pt-14 min-h-[80vh] border-t px-6 sm:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left side (form container) */}
        <div className="flex flex-col gap-4 max-w-[600px]">
          <TItle text1={"DELIVERY"} text2={"INFORMATION"} />

          <div className="flex gap-3">
            <input required onChange={onChangeHandler} name='firstName' value={formdata.firstName} className="border border-gray rounded py-1.5 px-3.5 w-full" placeholder="First Name" type="text" />
            <input required onChange={onChangeHandler} name='lastName' value={formdata.lastName}  className="border border-gray rounded py-1.5 px-3.5 w-full" placeholder="Last Name" type="text" />
          </div>
 
          <input required onChange={onChangeHandler} name='email' value={formdata.email}  className="border border-gray rounded py-1.5 px-3.5 w-full" placeholder="Email" type="email" />
          <input required onChange={onChangeHandler} name='street' value={formdata.street}  className="border border-gray rounded py-1.5 px-3.5 w-full" placeholder="Street" type="text" />

          <div className="flex gap-3">
            <input required  onChange={onChangeHandler} name='city' value={formdata.city}  className="border border-gray rounded py-1.5 px-3.5 w-full" placeholder="City" type="text" />
            <input required onChange={onChangeHandler} name='state' value={formdata.state}  className="border border-gray rounded py-1.5 px-3.5 w-full" placeholder="State" type="text" />
          </div>

          <div className="flex gap-3">
            <input required onChange={onChangeHandler} name='zipcode' value={formdata.zipcode}  className="border border-gray rounded py-1.5 px-3.5 w-full" placeholder="Pin code" type="number" />
            <input required onChange={onChangeHandler} name='country' value={formdata.country}  className="border border-gray rounded py-1.5 px-3.5 w-full" placeholder="country" type="text" />
          </div>
          <input required onChange={onChangeHandler} name='phone' value={formdata.phone}  className="border border-gray rounded py-1.5 px-3.5 w-full" placeholder="Phone" type="number" />
        </div>

        {/* Right side (Cart + Payment) */}
        <div className="flex flex-col gap-8">
          <CartTotal />

          <div>
            <TItle text1={"PAYMENT"} text2={"METHOD"} />

            <div className="flex gap-3 flex-col sm:flex-row mt-4">
              
              {/* Stripe */}
              {/* <div 
                onClick={()=>setMethod('stripe')}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer rounded"
              >
                <div className="w-4 h-4 border rounded-full flex items-center justify-center">
                  {method==='stripe' && <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>}
                </div>
                <img src={assets.addcart} className="h-5 mx-2" alt="stripe" />
                <p>Stripe</p>
              </div> */}

              {/* Razorpay */}
              <div 
                onClick={()=>setMethod('razorpay')}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer rounded"
              >
                <div className="w-4 h-4 border rounded-full flex items-center justify-center">
                  {method==='razorpay' && <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>}
                </div>
                <img src={assets.addcart} className="h-5 mx-2" alt="razorpay" />
                <p>Razorpay</p>
              </div>

              {/* COD */}
              <div 
                onClick={()=>setMethod('cod')}
                className="flex items-center gap-3 border p-2 px-3 cursor-pointer rounded"
              >
                <div className="w-4 h-4 border rounded-full flex items-center justify-center">
                  {method==='cod' && <div className="w-2.5 h-2.5 bg-green-400 rounded-full"></div>}
                </div>
                <p>Cash on Delivery</p>
              </div>

            </div>

            <div className='w-full text-end mt-8'>
              <button  type= 'submit' className='bg-black hover:bg-gray-800 text-white  px-16 py-3 text-xl  shadow-md transition'>
                Place Order
              </button>
            </div>

          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
