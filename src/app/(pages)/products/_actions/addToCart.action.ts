"use server"

//products/_actions/addToCart.action.ts
// post data with tokin in client component

import { GetCartResponseI } from "@/interfaces/cartInterface";

export async function addTocartAction(productId: string, token: string) {
    const response = await fetch(`${process.env.API}/cart`, {
        method: 'POST',
        body: JSON.stringify({ productId }),
        headers: {

            token: token,
            "Content-Type": "application/json"
        }
    });

    const data: GetCartResponseI = await response.json();

    return data
}