'use server'

import nodemailer from 'nodemailer';
import { NotificationType, EmailProductInfo, EmailContent } from "@/types";

const Notification = {
  WELCOME: 'WELCOME',
  LOWEST_PRICE: 'LOWEST_PRICE',
  CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
}

export const generateEmailBody = async (product: EmailProductInfo, type: NotificationType) => {
  let subject = "";
  let body = "";

  switch (type) {
    case Notification.WELCOME:
      subject = `WELCOME to AptBuy for ${product.title}!`
      body = `
        <div>
        <h2>Welcome to AptBuy!</h2>
        <p>You are now tracking ${product.title}.</p>
        <p>You will further recieve emails when the product is at its lowest price
         or it has change of stock</p>
        <p> The product: ${product.url}</p>
        <p>Stay tuned for updates</p>
        </div>
      `;
      break;

    case Notification.CHANGE_OF_STOCK:
      subject = `${product.title} is now back in stock`
      body = `
        <div>
          <p>The product is back in stock; to buy now click the link below</p>
          <p>${product.url}</p>
        </div>
      `;
      break;

    case Notification.LOWEST_PRICE:
      subject = `${product.title} at its lowest`
      body = `
        <div>
          <p>${product.title} is at its lowest price ever</p>
          <p>BUY NOW!</p>
          <p>${product.url}</p>
        </div>
      `;
      break;

    default:
      throw new Error("Invalid Notification type");
  }

  return { subject, body };
}

const transporter = nodemailer.createTransport({
  pool: true,
  service: 'hotmail',
  port: 2525,
  auth: {
    user: 'pvishal96@outlook.com',
    pass: process.env.EMAIL_PASSWORD,
  },
  maxConnections: 1
});

export const sendEmail = async (emailContent: EmailContent, sendTo: string[]) => {
  const mailOptions = {
    from: 'pvishal96@outlook.com',
    to: sendTo,
    subject: emailContent.subject,
    html: emailContent.body,
  }

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) return console.log(error);

    console.log("Email sent: ", info);
  })
}