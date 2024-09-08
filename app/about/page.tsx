import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10">
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          About AptBuy
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          <strong>AptBuy</strong> is a web application designed to enhance your
          online shopping experience by simplifying price tracking and product
          monitoring on Snapdeal, one of India's leading e-commerce platforms.
          With AptBuy, users can easily track price changes, receive
          notifications when prices drop, and monitor the availability of
          products, ensuring they never miss out on a great deal.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Key Features
        </h2>

        <ul className="list-disc list-inside text-lg text-gray-700 mb-6 space-y-2">
          <li>Track price changes on Snapdeal products in real-time.</li>
          <li>Receive notifications when prices drop to your desired range.</li>
          <li>Monitor the availability of out-of-stock items and get alerts when they are back in stock.</li>
          <li>User-friendly interface for seamless shopping and product monitoring experience.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Our Mission
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          At AptBuy, our mission is to simplify online shopping by helping users
          make informed purchasing decisions. We aim to save our users time and
          money by offering real-time price tracking and notifications so they
          never miss out on great deals.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">How It Works</h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Simply create an account, browse Snapdeal for the products you're
          interested in, and add them to your AptBuy watchlist.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>

        <p className="text-lg text-gray-700 leading-relaxed">
          If you have any questions or feedback, please feel free to reach out
          to us at:
        </p>

        <ul className="text-lg text-gray-700 mb-6">
          <li>Email: vishalp9966@gmail.com</li>
          <li>LinkedIn: <a href="https://linkedin.com/in/vishalpal-v96" className="text-blue-500 hover:underline">@aptbuy</a></li>
        </ul>
      </div>
    </div>
  );
};

export default About;
