import { getProductById } from '@/lib/actions';
import { Product } from '@/types';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
  params: { id: string }
}

const ProductDetails = async ({ params: { id } }: Props) => {
  const product: Product = await getProductById(id);

  if (!product) redirect('/')

  return (
    <div>
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

      </div>
    </div>
  )
}

export default ProductDetails