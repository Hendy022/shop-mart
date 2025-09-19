
// get-cart/route.ts 
// get data with token in client component

import { GetCartResponseI } from "@/interfaces/cartInterface";
import { getUserToken } from "@/utilities/GetToken";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const token = await getUserToken();
        
        // Fallback API URL if environment variable is not set
        const apiUrl = process.env.API || 'https://ecommerce.routemisr.com/api/v1';
        
        const response = await fetch(`${apiUrl}/cart`, {
            method: 'GET',
            headers: {
                token: token + ''
            }
        });

        if (!response.ok) {
            console.error('Cart API Error:', response.status, response.statusText);
            return NextResponse.json(
                { message: 'Failed to fetch cart data', error: response.statusText },
                { status: response.status }
            );
        }

        const data: GetCartResponseI = await response.json();

        return NextResponse.json(data, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, token',
            },
        });
    } catch (error) {
        console.error('Cart API Error:', error);
        return NextResponse.json(
            { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        );
    }
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