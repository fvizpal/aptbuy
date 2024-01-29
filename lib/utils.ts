import { PriceHistoryItem } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isValidSnapdealProductURL = (url: string) => {
  try {
    const parsedURL = new URL(url);
    const hostname = parsedURL.hostname;

    if (hostname.includes('snapdeal.com')) {
      return true;
    }
  } catch (error) {
    return false;
  }

  return false;
}

// Price determination functions
export const getLowestPrice = (priceList: PriceHistoryItem[]) => {
  let lowestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }

  return lowestPrice.price;
}

export const getHighestPrice = (priceList: PriceHistoryItem[]) => {
  let highestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }

  return highestPrice.price;
}

export const getAveragePrice = (priceList: PriceHistoryItem[]) => {
  // let sumOfPrices = 0;
  // priceList.forEach(item => sumOfPrices += item.price);
  // this is more efficient for large arrays
  const sumOfPrices = priceList.reduce((acc, curr) => acc + curr.price, 0);

  const averagePrice = sumOfPrices / priceList.length || 0;

  return averagePrice;
}