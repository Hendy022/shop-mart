
// get-cart/route.ts 
// get data with token in client component

import { GetCartResponseI } from "@/interfaces/cartInterface";
import { getUserToken } from "@/utilities/GetToken";
import { NextResponse } from "next/server";

export async function GET() {

    const token = await getUserToken();

    const response = await fetch(`${process.env.API}/cart`, {
        method: 'GET',
        headers: {
            token: token + ''
        }
    });

    const data: GetCartResponseI = await response.json();

    return NextResponse.json(data, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, token',
        },
    });
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, token',
        },
    });
}