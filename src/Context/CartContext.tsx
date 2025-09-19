"use client"
import { GetCartResponseI } from "@/interfaces/cartInterface";
import { createContext, useEffect, useState } from "react";

type CartContextI = {
    isLoading: boolean;
    cart: GetCartResponseI | null;
    setCart: (value: GetCartResponseI | null) => void;
    setIsLoading: (value: boolean) => void;
    getCartData: () => void;

}

export const CartContext = createContext<CartContextI>({
    isLoading: false,
    cart: null,
    setCart: () => { },
    setIsLoading: () => { },
    getCartData: () => { },

});

export default function CartContextProvider({ children }: { children: React.ReactNode }) {

    const [cart, setCart] = useState<GetCartResponseI | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    async function getCartData() {
        setIsLoading(true);

        const response = await fetch('http://localhost:3000/get-cart');
        if (response.ok) {

            const data: GetCartResponseI = await response.json();

            setCart(data);
        }
        setIsLoading(false);
    }
    useEffect(() => {

        getCartData()

    }, []);

    return <CartContext.Provider value={{ cart, setCart, isLoading, setIsLoading, getCartData }}>
        {children}
    </CartContext.Provider>

}