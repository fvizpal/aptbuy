import { Product } from "@/types"
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Link href={`/product/${product._id}`} className="product-card">
      <div className="flex-1 relative flex flex-col gap-5 p-4 rounded-md">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="max-h-[220px] object-contain w-full h-full bg-transparent"
        />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-xl leading-6 font-semibold truncate">{product?.title}</h3>
        <div className="flex justify-between">
          <p className="text-lg capitalize opacity-50">{product.category}</p>
          <p className="text-lg font-semibold">
            <span>{product?.currency}</span>
            <span>{product?.currentPrice}</span>
          </p>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard