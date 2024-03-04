'use server'

import { revalidatePath } from "next/cache";
import { connectDatabase } from "../database";
import Product from "../models/product.model";
import { scrapSiteProduct } from "../scrapper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "../mailer";

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
    revalidatePath('/');
  } catch (error) {
    console.log(error)
  }
}

export const getAllProducts = async () => {
  try {
    await connectDatabase();

    const products = await Product.find().sort({ updatedAt: 'desc' });
    revalidatePath('/');
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

export async function addUserEmailToProduct(productId: string, userEmail: string) {
  try {
    const product = await Product.findById(productId);

    if (!product) return;

    const userExists = product.users.some((user: User) => user.email === userEmail);

    if (!userExists) {
      product.users.push({ email: userEmail });

      await product.save();

      const emailContent = await generateEmailBody(product, "WELCOME");

      await sendEmail(emailContent, [userEmail]);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getSimilarProducts(productId: string) {
  try {
    connectDatabase();

    const currentProduct = await Product.findById(productId);

    if (!currentProduct) return null;

    const similarProducts = await Product.find({
      _id: { $ne: productId }, //ne: not equal to
    }).limit(4);

    return similarProducts;
  } catch (error) {
    console.log(error);
  }
}
