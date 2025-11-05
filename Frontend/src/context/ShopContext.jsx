import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "₹";
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItem, setCartItem] = useState({});
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const[token,setToken]=useState('');
    const [products ,setProducts]=useState([])
    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('Select Product Size');
            return
        }
        //to create a copy of cart item
        let cartData = structuredClone(cartItem);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItem(cartData);
        if(token)
        {
            try {
                await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
                
            }
        }
    }
    // useEffect(()=>{console.log(cartItem)},[cartItem])

    //update function (delete functionality)
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItem);
        cartData[itemId][size] = quantity;

        setCartItem(cartData);
        if(token)
        {
            try {
                await axios.post(backendUrl+'/api/cart/update',{itemId, size, quantity},{headers:{token}})
                
            } catch (error) {
                
            }
        }
    }
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItem) {
            for (const item in cartItem[items]) {

                try {
                    if (cartItem[items][item] > 0) {
                        //console.log("count is",cartItem);
                        totalCount += cartItem[items][item];
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItem) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItem[items][item];
                        console.log(totalAmount);
                    }
                }
                catch (error) {

                }
            }
        }
        return totalAmount;
    }

    const getProductData=async()=>
    {
        try {
           const response=await axios.get(backendUrl+'/api/product/list') 
          if(response.data.products){
            setProducts(response.data.products)
          }
          else{
            toat.error(response.data.message)
          }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
const getUserCart =async(token)=>{
    try {
        const response=await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}});
        if(response.data.success)
        {
            setCartItem(response.data.cartData)
        }
    } catch (error) {
        
        console.log(error)
            toast.error(error.message)
    }
}

    useEffect(()=>
    {getProductData()},[])


    useEffect(()=>
    {
        if(!token&&localStorage.getItem('token'))
        {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'));
        }
    },[])
    const value = {
        backendUrl, setToken,token, products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, cartItem,setCartItem, addToCart, getCartCount, updateQuantity, getCartAmount, navigate,
    }
    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider