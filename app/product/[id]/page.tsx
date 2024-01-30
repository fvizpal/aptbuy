import Modal from '@/components/shared/Modal';
import PriceInfoCard from '@/components/shared/PriceInfoCard';
import ProductCard from '@/components/shared/ProductCard';
import { getProductById, getSimilarProducts } from '@/lib/actions';
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

  const similarProducts = await getSimilarProducts(id);

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
              <Link href={product.url} target='_blank' className='max-w-xs rounded-md bg-teal-500 hover:bg-teal-600 py-2 px-4 text-white'>
                Visit Product
              </Link>
            </div>
            <div className='flex items-center gap-6'>
              <div>
                <p className='font-semibold'>
                  {product.reviewsText}
                </p>
              </div>
            </div>
            <div className='flex flex-col gap-6'>
              <p>
                Original Price: {product.currency} {product.originalPrice}
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
            <Modal productId={id} />
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
      {similarProducts && similarProducts?.length > 0 && (
        <div className="py-14 flex flex-col gap-2 w-full">
          <p className="section-text">Similar Products</p>

          <div className="flex flex-wrap gap-10 mt-7 w-full">
            {similarProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetails