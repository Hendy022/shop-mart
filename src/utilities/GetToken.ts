import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  try {
    const sessionToken = (await cookies()).get('next-auth.session-token')?.value;
    
    if (!sessionToken) {
      console.log('No session token found in cookies');
      return null;
    }

    if (!process.env.NEXTAUTH_SECRET) {
      console.error('NEXTAUTH_SECRET is not set');
      return null;
    }

    const token = await decode({ 
      token: sessionToken, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    console.log('Decoded token:', token);
    return token?.token || null;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}