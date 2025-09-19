import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Category } from '@/interfaces/categoryInterface'
import Image from 'next/image'
import Link from 'next/link'

export default async function Categories() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/categories', {
    cache: 'force-cache'
  })
  const { data: categories }: { data: Category[] } = await response.json()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Categories</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link key={category._id} href={`/categories/${category._id}`}>
            <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <CardHeader className="p-0">
                <div className="relative w-full h-48">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-center text-lg font-semibold">
                  {category.name}
                </CardTitle>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
