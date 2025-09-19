"use client"
import React, { useContext, useState } from 'react'
import { CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import HeartIcon from '../Icons/HeartIcon'
import CartIcon from '../Icons/CartIcon'
import { GetCartResponseI } from '@/interfaces/cartInterface'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { CartContext } from '@/Context/CartContext'
import { useRouter } from 'next/navigation'

export default function AddToCart({ productId, token }: { productId: string, token: string | undefined }) {
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter()
    const { setCart, getCartData } = useContext(CartContext);

    async function addProductToCart() {

        if (!token) {
            router.push('/auth/login')
        } else {


            setIsLoading(true);
            
            const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
                method: 'POST',
                body: JSON.stringify({ productId }),
                headers: {
        
                    token: token,
                    "Content-Type": "application/json"
                }
            });
        
            const data: GetCartResponseI = await response.json();
            console.log(data)
            toast.success(data.message ?? "");
            setCart(data);
            // Refresh cart data to ensure consistency
            getCartData();
            setIsLoading(false);
        }
    }


    return (
        <div>
            <CardFooter className="gap-1">
                <Button disabled={isLoading} onClick={addProductToCart} className="grow cursor-pointer">
                    {isLoading ? <Loader2 className='animate-spin' /> : <CartIcon />}  Add To Cart </Button>
                <HeartIcon />
            </CardFooter>
        </div>
    )
}
