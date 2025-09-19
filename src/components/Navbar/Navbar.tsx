"use client"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import CartIcon from "../Icons/CartIcon"

import { Loader2 } from "lucide-react"
import { GetCartResponseI } from "@/interfaces/cartInterface"
import { useContext } from "react"
import { CartContext } from "@/Context/CartContext"
import { signOut, useSession } from "next-auth/react"

export default function Navbar() {

  const { cart, isLoading } = useContext(CartContext);

  const session = useSession();




  return <>
    <nav className="border-b border-muted text-xl font-semibold fixed z-50  top-0 inset-x-0 bg-accent/90 shadow ">

      <div className="container mx-auto p-3 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <Link href={'/'} className="font-bold flex items-center gap-1"> <span className="px-3 py-0.5 rounded-lg text-white bg-black">S</span>ShopMart</Link>
        
        <NavigationMenu className="">
          <NavigationMenuList className="flex-col items-start   sm:flex-row">

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/products">Products</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/brands">Brands</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/categories">Categories</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex gap-2">

          <DropdownMenu>
            <DropdownMenuTrigger className="flex gap-1 outline-0">

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>

            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {session.status == 'authenticated' ? <>


                <Link href={'/allorders'}><DropdownMenuItem >Your Orders</DropdownMenuItem></Link>

                <DropdownMenuItem onClick={() => {
                  signOut({ callbackUrl: '/' })
                }}>Logout</DropdownMenuItem>
              </> : <>
                <Link href={'/auth/login'}><DropdownMenuItem >Login</DropdownMenuItem></Link>
                <Link href={'/auth/register'}><DropdownMenuItem >Register</DropdownMenuItem></Link>

              </>}
            </DropdownMenuContent>
          </DropdownMenu>
          {session.status == 'authenticated' && <Link href={'/cart'} className="relative pt-1  ">


            <CartIcon />
            <Badge className="h-4 min-w-2 rounded-full px-1 tabular-nums absolute -top-1/4 -end-1/2">
              {isLoading ? <Loader2 className="animate-spin" /> : cart?.numOfCartItems || 0}
            </Badge>
          </Link>}
        </div>
      </div>
    </nav>
  </>
}
