
// auth.ts config
import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { FailedLoginInterface, SuccessLoginResponse } from './interfaces/login';
// import { pages } from 'next/dist/build/templates/app-page';

export const authOptions: NextAuthOptions = {

    pages: {
        signIn: '/auth/login',
    }
    ,
    providers: [
        Credentials({
            name: 'Credentials-login',
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials) => {
                const response = await fetch(`${process.env.API}/auth/signin`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),
                    headers: { "Content-Type": "application/json" }
                });
                const payload: SuccessLoginResponse | FailedLoginInterface = await response.json();

                if ("statusMsg" in payload) {
                    throw new Error(payload.message)
                }

                return {
                    id: payload.token,
                    token: payload.token,
                    user: payload.user
                }
            }
        }),
        Credentials({
            name: 'credentials',
            credentials: {
                name: {},
                email: {},
                password: {},
                rePassword: {},
                phone: {},
            },
            authorize: async (credentials) => {
                const response = await fetch(`${process.env.API}/auth/signup`, {
                    method: 'POST',
                    body: JSON.stringify({
                        name: credentials?.name,
                        email: credentials?.email,
                        password: credentials?.password,
                        rePassword: credentials?.rePassword,
                        phone: credentials?.phone,
                    }),
                    headers: { "Content-Type": "application/json" }
                });
                const payload: SuccessLoginResponse | FailedLoginInterface = await response.json();

                if ("statusMsg" in payload) {
                    throw new Error(payload.message)
                }

                return {
                    id: payload.token,
                    token: payload.token,
                    user: payload.user
                }
            }
        }),
    ],
    callbacks: {
        jwt({token , user}){
            if (user) {
                token.token = user.token,
                token.user = user.user
            }
            return token;
        },
        session ({session , token}){
            session.user = token.user;
            return session
        }
    }
} 


