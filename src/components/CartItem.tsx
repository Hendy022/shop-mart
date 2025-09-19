"use client"
import { CartContext } from '@/Context/CartContext';
import { GetCartResponseI, Product, Product2 } from '@/interfaces/cartInterface'
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';


function formatCurrency(num: number) {
    return new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "EGP"
    }).format(num);
}
export default function CartItem({ item, setInnerCart , token }: 
    { token:string | undefined ,setInnerCart: (value: GetCartResponseI) => void, item: Product<Product2> }) {

    const [isRemoving, setIsRemoving] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    
    

    async function removeCartItem() {
        setIsRemoving(true)
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/' + item.product.id, {
            method: 'DELETE',
            headers: {
                token: token!
            }
        })
        const data = await response.json();
        toast.success("Product removed Successfully");
        
        setInnerCart(data)
        setIsRemoving(false)
    }

    async function updateCartItemQuantity(productCount : number) {
        setIsUpdating(true)
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/' + item.product.id, {
            method: 'PUT',
            body: JSON.stringify({count : productCount}) , 
            headers: {
                token: token!,
                "Content-Type": "application/json"
            }
        })
        const data = await response.json();
        toast.success("Product Quantity Updated Successfully")
        setInnerCart(data)
        
        setIsUpdating(false)
    }

    return (
        <div

            className="flex gap-4 rounded-xl border p-4 shadow-sm bg-card"
        >
            <Image
                width={100}
                height={100}
                src={item.product.imageCover}
                alt={item.product.title}
                className="w-24 h-24 rounded-lg object-cover md:w-28 md:h-28"
            />

            <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                    <div className="min-w-0">
                        <h3 className="font-semibold text-base md:text-lg line-clamp-2">
                            {item.product.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                            {item.product.brand.name} · {item.product.category.name}
                        </p>
                    </div>

                    <div className="text-right shrink-0">
                        <div className="font-semibold">
                            {formatCurrency(item.price)}
                        </div>
                        <div className="text-xs text-muted-foreground">each</div>
                    </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button disabled={item.count == 1} onClick={()=> updateCartItemQuantity(item.count - 1)}
                            aria-label="decrease"
                            className="size-8 rounded-lg border hover:bg-accent cursor-pointer"
                        >
                            –
                        </button>
                        <span className="w-6 text-center font-medium">
                            {isUpdating ? <Loader2 className='animate-spin'/> :item.count}
                        </span>
                        <button onClick={()=> updateCartItemQuantity(item.count + 1)}
                            aria-label="increase"
                            className="size-8 rounded-lg border hover:bg-accent"
                        >
                            +
                        </button>
                    </div>

                    <button onClick={removeCartItem}
                        aria-label="remove"
                        className="text-destructive hover:underline text-sm  cursor-pointer"
                    >
                        {isRemoving ? <Loader2 className='animate-spin'/> :  'Remove'} 
                    </button>
                </div>
            </div>
        </div>
    )
}
