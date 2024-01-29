'use server'

import axios from "axios";
import * as cheerio from 'cheerio';

export const scrapSiteProduct = async (url: string) => {
  if (!url) return;

  try {
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    const title = $('.pdp-e-i-head').text().trim();

    // const images = $('#bx-pager-left-image-panel a img') || {}

    // const imageUrls = Object.keys(JSON.parse(images));

    const currentPrice = $('.payBlkBig').text().trim();
    const originalPrice = $('.pdpCutPrice').text().trim();

    const discountRate = $('.pdpDiscount > span').text().trim();
    const outOfStock = currentPrice ? true : false;

    const description = $('.detailssubbox').text().trim();
    const reviewsCount = 100 // Number($('span.total-rating.showRatingTooltip').text().trim().match(/\d+/)[0]) || 100

    const data = {
      url,
      currency: 'Rs.',
      // image: imageUrls[0],
      title,
      currentPrice: Number(currentPrice) || Number(originalPrice),
      originalPrice: Number(originalPrice) || Number(currentPrice),
      priceHistory: [],
      discountRate: Number(discountRate),
      category: 'category',
      reviewsCount,
      stars: 4.5,
      isOutOfStock: outOfStock,
      description,
      lowestPrice: Number(currentPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currentPrice),
      averagePrice: Number(currentPrice) || Number(originalPrice),
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}