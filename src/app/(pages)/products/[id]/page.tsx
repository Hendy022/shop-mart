import AddToCart from "@/components/AddToCart/AddToCart";
import StarIcon from "@/components/Icons/StarIcon";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import { Product } from "@/interfaces";
import { formatCurrency } from "@/utilities/formatPrice";
import { getUserToken } from "@/utilities/GetToken";
import Image from "next/image";
import ProductSlider from "../_component/ProductSlider";

interface ProductDetailsProps {
    params: {
        id: string
    }
}


export default async function ProductDetails({ params }: ProductDetailsProps) {

    const { id } = await params;

    const response = await fetch('https://ecommerce.routemisr.com/api/v1/products/' + id);
    const { data: product }: { data: Product } = await response.json();

    const token = await getUserToken();

    return <>


        <div className="min-h-screen flex justify-center items-center -mt-12">
            <div>
                <Card className="gap-4 lg:min-w-3xl flex-col md:flex-row items-center">
                    <CardHeader className="md:w-1/2 w-full p-10 md:p-0">
                        <ProductSlider images={product.images}/>
                    </CardHeader>
                    <div className="space-y-4 md:w-2/3">

                        <CardContent className=" space-y-4 h-full ">
                            <span className="text-gray-500 text-xs">{product.brand.name}</span>
                            <h2 className=" font-bold">{product.title}</h2>
                            <p>{product.description}</p>
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
                        <AddToCart productId={product.id} token={token ?? undefined}/>
                    </div>
                </Card>
            </div>
        </div>


    </>
}
