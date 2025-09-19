"use client"

import { Button } from "@/components/ui/button"
import CartItem from "./CartItem"
import { Loader2, Trash2 } from "lucide-react"
import { GetCartResponseI } from "@/interfaces/cartInterface";
import { useContext, useEffect, useRef, useState } from "react";
import { CartContext } from "@/Context/CartContext";
import Link from "next/link";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



function formatCurrency(num: number) {
    return new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "EGP"
    }).format(num);
}

export default function InnerCart({ cartData , token }: { cartData: GetCartResponseI , token: string| undefined }) {

    const [isLoading, setIsLoading] = useState(false)
    const [cart, setInnerCart] = useState<GetCartResponseI>(cartData);

    const [isclearing, setIsclearing] = useState(false);
    const city = useRef<HTMLInputElement | null>(null);
    const details = useRef<HTMLInputElement | null>(null);
    const phone = useRef<HTMLInputElement | null>(null);

    const { getCartData } = useContext(CartContext);

    async function clearCart() {
        
        setIsclearing(true)
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart/', {
            method: 'DELETE',
            headers: {
                token: token!
            }
        })
        const data = await response.json();
        setInnerCart(data)
        await getCartData()
        setIsclearing(false)
    }

    async function checkoutSession() {
        setIsLoading(true)
        const address = JSON.stringify({
            shippingAddress: {
                city: city.current?.value,
                details: details.current?.value,
                phone: phone.current?.value,
            }
        })
        const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:3000`, {
            method: 'POST',
            body:address,
            headers:{
                token: token!,
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        if (data.status == 'success') {
            location.href = data.session.url
        }
        setIsLoading(false)
    }


    const { setCart } = useContext(CartContext);

    useEffect(() => {
        setCart(cart);
    }, [cart])

    return (
        <>

            {
                cart.numOfCartItems ? <>  <p className="text-muted-foreground mt-1">
                    {cartData?.data.products.length} items in your cart
                </p>
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-start mt-6">
                        {/* Items Column */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart.data.products.map((item) => (
                                <CartItem key={item._id} item={item} token={token} setInnerCart={setInnerCart} />
                            ))}
                        </div>

                        {/* Summary Column */}
                        <div className="lg:col-span-1 sticky top-18">
                            <div className="rounded-xl border p-5 shadow-sm ">
                                <h2 className="text-lg font-semibold">Order Summary</h2>
                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">
                                            Subtotal ({cart.data.products.length} items)
                                        </span>
                                        <span className="font-semibold">{formatCurrency(cart.data.totalCartPrice)}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">Shipping</span>
                                        <span className="text-emerald-600 font-medium">Free</span>
                                    </div>
                                </div>

                                <div className="my-4 border-t" />

                                <div className="flex items-center justify-between">
                                    <span className="text-base font-semibold">Total</span>
                                    <span className="text-base font-bold">{cart.data.totalCartPrice}</span>
                                </div>


                                <button className="w-full  cursor-pointer mt-3 h-11 rounded-xl border hover:bg-accent">
                                    Continue Shopping
                                </button>

                                <Dialog>
                                    <form>
                                        <DialogTrigger asChild>
                                            <button className="w-full cursor-pointer mt-5 h-11 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90">
                                                Proceed to Checkout
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Add Address</DialogTitle>
                                                <DialogDescription>
                                                    Add a shipping address for your deliveries.
                                                </DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4">
                                                <div className="grid gap-3">
                                                    <Label htmlFor="city">City : </Label>
                                                    <Input ref={city} id="city" name="city" />
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="details">Details : </Label>
                                                    <Input ref={details} id="details" name="details" />
                                                </div>
                                                <div className="grid gap-3">
                                                    <Label htmlFor="phone">Phone Number :</Label>
                                                    <Input ref={phone} id="phone" name="phone" />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DialogClose>
                                                <Button disabled={isLoading}  className=" cursor-pointer" onClick={checkoutSession} type="submit">
                                                    {isLoading && <Loader2 className="animate-spin" />}
                                                    Checkout</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </form>
                                </Dialog>
                            </div>
                            <Button onClick={clearCart}
                                variant={'outline'} className="mt-2 ms-auto text-destructive hover:text-destructive cursor-pointer ">
                                {isclearing ? <Loader2 className="animate-spin" /> : <Trash2 />}
                                clear cart
                            </Button>
                        </div>
                    </div>
                </> :
                    <div className="min-h-[60vh] flex flex-col gap-4 items-center justify-center">
                        <h2 className="text-2xl font-semibold">Your Cart Is Empty</h2>
                        <Button><Link href={'/products'}>Add ones</Link></Button>
                    </div>
            }
        </>

    )
}
