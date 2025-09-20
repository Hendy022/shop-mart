"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

export default function ProductSlider({ images }: { images: string[] }) {
    return <>

        <Carousel plugins={[
            Autoplay({
                delay: 1500,
            }),
        ]} opts={{
            loop: true,
        }}>
            <CarouselContent >
                {images.map((img) => <CarouselItem key={img}>
                    <Image className="w-full" src={img} alt={''} width={700} height={700} /> </CarouselItem>)}


            </CarouselContent>
        </Carousel>
    </>
}
