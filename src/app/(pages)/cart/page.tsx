import { GetCartResponseI } from "@/interfaces/cartInterface";
import InnerCart from "@/components/InnerCart";
import { getUserToken } from "@/utilities/GetToken";


export default async function CartList() {

  const token = await getUserToken();
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
    method: 'GET',
    headers: {

      token: token!
    }
  });
  const cartData: GetCartResponseI = await response.json();

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>

      
        <InnerCart cartData={cartData} token={token}/> 
    </div>
  );
}



