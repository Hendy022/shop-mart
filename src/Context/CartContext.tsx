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

        try {
            const response = await fetch(`/get-cart`);
            if (response.ok) {
                const data: GetCartResponseI = await response.json();
                setCart(data);
            } else {
                console.error('Failed to fetch cart data:', response.status, response.statusText);
                const errorData = await response.json().catch(() => ({}));
                console.error('Error details:', errorData);
            }
        } catch (error) {
            console.error('Error fetching cart data:', error);
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