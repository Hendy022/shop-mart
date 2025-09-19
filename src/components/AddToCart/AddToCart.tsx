"use client"
import React, { useContext, useEffect, useState } from 'react'
import { CardFooter } from '../ui/card'
import { Button } from '../ui/button'
import HeartIcon from '../Icons/HeartIcon'
import CartIcon from '../Icons/CartIcon'
import { AddCartResponseI, GetCartResponseI } from '@/interfaces/cartInterface'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { CartContext } from '@/Context/CartContext'
import { useRouter } from 'next/navigation'
import { addTocartAction } from '@/app/(pages)/products/_actions/addToCart.action'

export default function AddToCart({ productId, token }: { productId: string, token: string | undefined }) {
    const [isLoading, setIsLoading] = useState(false);

    let router = useRouter()
    const { setCart } = useContext(CartContext);

    async function addProductToCart() {

        if (!token) {
            router.push('/auth/login')
        } else {


            setIsLoading(true);
            
            const data: GetCartResponseI = await addTocartAction(productId , token);
            toast.success(data.message ?? "");
            setCart(data)
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
