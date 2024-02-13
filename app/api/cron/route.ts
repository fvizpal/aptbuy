import { connectDatabase } from "@/lib/database";
import Product from "@/lib/models/product.model";
import { scrapSiteProduct } from "@/lib/scrapper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "@/lib/utils";
import { NextResponse } from "next/server";

export const maxDuration = 3000;
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    await connectDatabase();

    const products = await Product.find({});

    if (!products) throw new Error('No products fetched');

    const updatedProducts = await Promise.all(
      products.map(async (currProduct) => {
        const scrapedProduct = await scrapSiteProduct(currProduct.url);

        if (!scrapedProduct) return;

        const updatedPriceHistory = [
          ...currProduct.priceHistory,
          {
            price: scrapedProduct.currentPrice,
          },
        ]

        const product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
        }

        const updatedProduct = await Product.findOneAndUpdate(
          { url: product.url },
          product,
        );

        return updatedProduct;
      })
    )

    return NextResponse.json({
      message: 'ok',
      data: updatedProducts
    })

  } catch (error) {
    throw new Error(`${error}`);
  }
}