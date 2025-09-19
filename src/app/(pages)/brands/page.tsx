import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brand } from '@/interfaces/brandInterface'
import Image from 'next/image'
import Link from 'next/link'

export default async function Brands() {
  const response = await fetch('https://ecommerce.routemisr.com/api/v1/brands', {
    cache: 'force-cache'
  })
  const { data: brands }: { data: Brand[] } = await response.json()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Brands</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <Link key={brand._id} href={`/brands/${brand._id}`}>
            <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <CardHeader className="p-0">
                <div className="relative w-full h-48">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-center text-lg font-semibold">
                  {brand.name}
                </CardTitle>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
