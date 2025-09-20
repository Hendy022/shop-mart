import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {

  const sessionToken = (await cookies()).get('__Secure-next-auth.session-token')?.value;


  const token = await decode({
    token: sessionToken,
    secret: process.env.NEXTAUTH_SECRET!
  });

  console.log('Decoded token:', token);
  return token?.token;

}