import PriceInfoCard from '@/components/shared/PriceInfoCard';
import { getProductById } from '@/lib/actions';
import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
  params: { id: string }
}

const ProductDetails = async ({ params: { id } }: Props) => {
  const product: Product = await getProductById(id);

  if (!product) redirect('/')

  return (
    <div className='product-container'>
      <div className="flex gap-28 flex-col">
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.title}
            width={580}
            height={400}
            className="mx-auto"
          />
        </div>
        <div className='flex flex-col'>
          <div className='flex justify-between items-start gap-6 flex-wrap pb-6'>
            <div className='flex flex-col gap-3'>
              <p className='text-[28px] font-semibold'>
                {product.title}
              </p>
              <Link href={product.url} target='_blank'>
                Visit Product
              </Link>
            </div>
            <div className='flex items-center gap-6'>
              <div>
                <p className='font-semibold'>
                  {product.reviewsCount}
                </p>
              </div>
            </div>
            <div className='flex flex-col gap-6'>
              <p>
                {product.currency} {product.currentPrice}
              </p>
              <p>
                {product.currency} {product.originalPrice}
              </p>
            </div>
          </div>
          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard
                title="Current Price"
                iconSrc="/assets/icons/price-tag-rupee.svg"
                value={`${product.currency} ${(product.currentPrice)}`}
              />
              <PriceInfoCard
                title="Average Price"
                iconSrc="/assets/icons/price-tag-rupee.svg"
                value={`${product.currency} ${(product.averagePrice)}`}
              />
              <PriceInfoCard
                title="Highest Price"
                iconSrc="/assets/icons/arrow-square-up.svg"
                value={`${product.currency} ${(product.highestPrice)}`}
              />
              <PriceInfoCard
                title="Lowest Price"
                iconSrc="/assets/icons/arrow-square-down.svg"
                value={`${product.currency} ${(product.lowestPrice)}`}
              />
            </div>
            {/* MODAL */}
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-16'>
        <div className='flex flex-col gap-5'>
          <h3 className='text-2xl font-semibold'>
            Product Description
          </h3>
          <div className='flex flex-col gap-4'>
            {product?.description?.split('\n')}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails