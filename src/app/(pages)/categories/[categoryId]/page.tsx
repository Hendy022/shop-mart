import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Product } from '@/interfaces/productsInterface'
import { Category } from '@/interfaces/categoryInterface'
import { formatCurrency } from '@/utilities/formatPrice'
import { getUserToken } from '@/utilities/GetToken'
import AddToCart from '@/components/AddToCart/AddToCart'
import StarIcon from '@/components/Icons/StarIcon'
import Image from 'next/image'
import Link from 'next/link'

interface CategoryProductsProps {
  params: {
    categoryId: string
  }
}

export default async function CategoryProducts({ params }: CategoryProductsProps) {
  const { categoryId } = await params
  
  // Fetch category details
  const categoryResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`, {
    cache: 'force-cache'
  })
  const { data: category }: { data: Category } = await categoryResponse.json()

  // Fetch products for this category
  const productsResponse = await fetch(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`, {
    cache: 'force-cache'
  })
  const { data: products }: { data: Product[] } = await productsResponse.json()

  const token = await getUserToken()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">{category.name}</h1>
        <p className="text-muted-foreground">Products in this category</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No products found in this category.</p>
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
                <AddToCart productId={product.id} token={token} />
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}