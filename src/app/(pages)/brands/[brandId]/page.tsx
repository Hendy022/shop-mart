import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Product } from '@/interfaces/productsInterface'
import { Brand } from '@/interfaces/brandInterface'
import { formatCurrency } from '@/utilities/formatPrice'
import { getUserToken } from '@/utilities/GetToken'
import AddToCart from '@/components/AddToCart/AddToCart'
import StarIcon from '@/components/Icons/StarIcon'
import Image from 'next/image'
import Link from 'next/link'

interface BrandProductsProps {
  params: {
    brandId: string
  }
}

export default async function BrandProducts({ params }: BrandProductsProps) {
  const { brandId } = await params
  
  // Fetch brand details
  const brandResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`, {
    cache: 'force-cache'
  })
  const { data: brand }: { data: Brand } = await brandResponse.json()

  // Fetch products for this brand
  const productsResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`, {
    cache: 'force-cache'
  })
  const { data: products }: { data: Product[] } = await productsResponse.json()

  const token = await getUserToken()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{brand.name}</h1>
        <p className="text-muted-foreground">Products from this brand</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No products found from this brand.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="p-2">
              <Card className="gap-4">
                <Link href={`/products/${product.id}`}>
                  <CardHeader>
                    <Image 
                      priority={false} 
                      className="w-full h-75 object-cover" 
                      src={product.imageCover} 
                      alt={product.title} 
                      width={200} 
                      height={200} 
                    />
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
                      <span className="text-lg font-semibold">{formatCurrency(product.price)}</span>
                    </div>
                  </CardContent>
                </Link>
                <AddToCart productId={product.id} token={token ?? undefined } />
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}