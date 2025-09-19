import AddToCart from "@/components/AddToCart/AddToCart";
import CartIcon from "@/components/Icons/CartIcon";
import HeartIcon from "@/components/Icons/HeartIcon";
import StarIcon from "@/components/Icons/StarIcon";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Product } from "@/interfaces";
import { formatCurrency } from "@/utilities/formatPrice";
import { getUserToken } from "@/utilities/GetToken";
import Image from "next/image";
import Link from "next/link";

export default async function Products() {
    let response = await fetch('https://ecommerce.routemisr.com/api/v1/products',{
        cache: 'force-cache'
    });
    let { data: products }: { data: Product[] } = await response.json();

    const token = await getUserToken();


    return <>

        <div className="flex flex-wrap ">
            {products.map((product) =>
                <div className="p-2 w-full md:w-1/2 lg:w-1/4" key={product.id}>
                    <Card className="gap-4">
                        <Link href={'/products/' + product.id}>
                            <CardHeader>
                                <Image priority={false} className="w-full h-75 object-cover" src={product.imageCover} alt={product.title} width={200} height={200} />
                            </CardHeader>
                            <CardContent>
                                <span className="text-gray-500 text-xs">{product.brand.name}</span>
                                <h2 className="line-clamp-1 font-bold">{product.title}</h2>
                                <span className="text-gray-500 text-xs">{product.category.name}</span>
                                <div className="flex -ms-1">
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <span className="text-gray-500 text-sm ms-2">({product.ratingsQuantity})</span>
                                </div>
                                <div className="flex items-center justify-between">

                                    <span className="text-lg font-semibold  ">{formatCurrency(product.price)} </span>
                                </div>
                            </CardContent>
                        </Link>

                        <AddToCart productId={product.id} token={token}/>
                    </Card>
                </div>
            )}
        </div>

    </>
}
