import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { OrdersInterface } from '@/interfaces/ordersInterface'
import { getUserToken } from '@/utilities/GetToken'
import { jwtDecode } from "jwt-decode";

type JwtPayload={
  id: string
}

export default async function AllOrders() {

  const token = await getUserToken();
  const decodedToken: JwtPayload = jwtDecode(token+'')
  

  const response = await fetch('https://ecommerce.routemisr.com/api/v1/orders/user/'+ decodedToken.id);
  const ordersResponse : OrdersInterface = await response.json();


  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">All Orders</h1>
      {ordersResponse.reverse().map((order, idx) => (
        <div key={order._id} className="mb-8 border rounded-lg shadow p-6 bg-white">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
            <div className="text-gray-600 text-sm mb-1">Order Date: {new Date(order.createdAt).toLocaleString()}</div>
            <div className="text-gray-600 text-sm mb-1">Payment: {order.paymentMethodType} {order.isPaid ? <span className="text-green-600">(Paid)</span> : <span className="text-red-600">(Unpaid)</span>}</div>
            <div className="text-gray-600 text-sm mb-1">Delivered: {order.isDelivered ? <span className="text-green-600">Yes</span> : <span className="text-yellow-600">No</span>}</div>
            <div className="text-gray-600 text-sm">Total: <span className="font-bold">{order.totalOrderPrice} EGP</span></div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-1">Shipping Address</h3>
            <div className="text-gray-700 text-sm">
              {order.shippingAddress.details}, {order.shippingAddress.city} <br />
              Phone: {order.shippingAddress.phone}
            </div>
          </div>
          <div className="mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition text-sm font-medium">
                View Order Items
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 mx-auto">
              <DropdownMenuLabel>Order Items</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {order.cartItems.map((item) => (
                <DropdownMenuItem key={item._id} className="flex items-center gap-3 py-2">
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{item.product.title}</div>
                    <div className="text-xs text-gray-500">
                      Qty: {item.count} &nbsp;|&nbsp; Price: {item.price} EGP
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
          <div className="text-right text-sm text-gray-500">Last updated: {new Date(order.updatedAt).toLocaleString()}</div>
        </div>
      ))}
    </div>
    
  )
}

