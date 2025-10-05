import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext=createContext();

const ShopContextProvider =(props)=>
{
    const currency="₹";
    const delivery_fee=10;
    const [search, setSearch]=useState('');
    const[showSearch,setShowSearch]=useState(false);
    const [cartItem,setCartItem]=useState({});
    const navigate=useNavigate();

    const addToCart=async(itemId,size)=>{
        if(!size)
        {
            toast.error('Select Product Size');
            return
        }
        //to create a copy of cart item
        let cartData=structuredClone(cartItem);

        if(cartData[itemId])
        {
            if(cartData[itemId][size])
            {
                cartData[itemId][size]+=1;
            }
            else{
                cartData[itemId][size]=1;
            }
        }
        else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }
        setCartItem(cartData);
    }
    // useEffect(()=>{console.log(cartItem)},[cartItem])

    //update function (delete functionality)
    const updateQuantity=async (itemId,size,quantity)=>
    {
        let cartData=structuredClone(cartItem);
        cartData[itemId][size]=quantity;

        setCartItem(cartData);
    }
    const getCartCount=()=>
    {
        let totalCount=0;
        for (const items in cartItem)
        {
            for(const item in cartItem[items])
            {

                try{
                    if(cartItem[items][item]>0)
                    {
                        //console.log("count is",cartItem);
                            totalCount+=cartItem[items][item];
                    }
                }catch(error)
                {
                    
                }
            }
        }
        return totalCount;
    }

    const getCartAmount=()=>
    {
        let totalAmount=0;
        for(const items in cartItem)
        {
            let itemInfo=products.find((product)=>product._id===items);
            for (const item in cartItem[items])
            {
                try{
                    if(cartItem[items][item]>0)
                    {
                        totalAmount+=itemInfo.price*cartItem[items][item];
                        console.log(totalAmount);
                    }
                }
                catch(error)
                {

                }
            }
        }
        return totalAmount;
    }
    const value={
        products,currency,delivery_fee,search,setSearch,showSearch,setShowSearch,cartItem,addToCart,getCartCount,updateQuantity,getCartAmount,navigate
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider