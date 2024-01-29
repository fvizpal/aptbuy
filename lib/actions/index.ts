'use server'

import { revalidatePath } from "next/cache";
import { connectDatabase } from "../database";
import Product from "../models/product.model";
import { scrapSiteProduct } from "../scrapper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

export const scrapeAndStore = async (productUrl: string) => {
  if (!productUrl) return;

  try {
    await connectDatabase();

    const scrapedProduct = await scrapSiteProduct(productUrl);

    if (!scrapedProduct) return;

    let product = scrapedProduct;

    const existingProduct = await Product.findOne({ url: scrapedProduct.url });

    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice }
      ]

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      }
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true } // if it doesnt have one it will create in db
    );

    revalidatePath(`/products/${newProduct._id}`); // invalidate the product page for revalidation
  } catch (error) {
    console.log(error)
  }
}

export const getAllProducts = async () => {
  try {
    await connectDatabase();

    const products = await Product.find();

    return products;
  } catch (error) {
    console.log(error);
  }
}

export const getProductById = async (productId: string) => {
  try {
    await connectDatabase();

    const product = await Product.findOne({ _id: productId });

    if (!product) return null;

    return product;
  } catch (error) {
    console.log(error);
  }
}