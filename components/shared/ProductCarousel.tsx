'use client'

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

const heroImages = [
  { imgUrl: '/assets/images/carousel-1.jpg', alt: 'chair' },
  { imgUrl: '/assets/images/carousel-2.jpg', alt: 'glasses' },
  { imgUrl: '/assets/images/carousel-3.jpg', alt: 'phone' },
  { imgUrl: '/assets/images/carousel-4.jpg', alt: 'blender' },
  { imgUrl: '/assets/images/carousel-5.jpg', alt: 'bottle' },
]

const ProductCarousel = () => {
  return (
    <Carousel className="w-full max-w-xs basis-1/2">
      <CarouselContent>
        {heroImages.map((image) => (
          <CarouselItem key={image.alt}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <Image
                    key={image.alt}
                    src={image.imgUrl}
                    alt={image.alt}
                    width={484}
                    height={484}
                    className="object-contain"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default ProductCarousel;
