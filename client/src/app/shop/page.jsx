import { WhatsAppIcon } from '@/icons/icon';
import Link from 'next/link';
import React from 'react';

const products = [
  { name: "Paper", price: "₹15", quantity: "5kg", link: "/products/paper", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKr7KLRYm614imBxNtYkLLjl1vfL9XgnsqKzHahAdByRTB7RvZw-oXjMA&s=10" },
  { name: "Plastic", price: "₹25", quantity: "2kg", link: "/products/plastic", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBgsdTzRtn-wntFZEn0GHJ4CJhdrTkQRMhQ4mP1VW0V1wSKJuVvfOi4Rri&s=10" },
  { name: "Glass", price: "₹300", quantity: "1kg", link: "/products/glass", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRAuGU5S-sseZQ2prc5pdC-hZMp4gYCtelzg&usqp=CAU" },
  { name: "Cardboard", price: "₹220", quantity: "2kg", link: "/products/cardboard", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGn-R9N5puxTUmWQaGItDxGyP2B74TCfkItw&usqp=CAU" },
  { name: "Wood", price: "₹400", quantity: "1kg", link: "/products/wood", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLhAuBWJXqWhR9QUy5h_BjwaRLhoZRFG12q4rv2swE30E2gaF5L4Wkl5o&s=10" },
  { name: "Metal", price: "₹650", quantity: "2kg", link: "/products/metal", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2W46QDQTxPWvO1VpJ9gRyaUyoFIdSF17pwQ&usqp=CAU" },
  { name: "Fabric", price: "₹350", quantity: "3kg", link: "/products/fabric", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB4RbDtfqI_UpcBCPTjqfqjRhOBI-1BdXzhg&usqp=CAU" },
  { name: "Cotton", price: "₹180", quantity: "2kg", link: "/products/cotton", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-mjg3WvHUD_svkkH6TXNfdz24XDD2vWg1Jw&usqp=CAU" },
  { name: "E-waste", price: "₹500", quantity: "1kg", link: "/products/e-waste", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0tnhWTJoBqWn3j0Yg6UyKOEtxT8klCvKhCl0V-52Ql9GbuiUBvaqsTncH&s=10" },
];

function Page() {
  return (
    <div
      className="relative w-full h-full bg-cover bg-center bg-green-50"
    // style={{ backgroundImage: 'linear-gradient(#0005, #0005),url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvQbvZ2tN5uBhSxIj6_-Dc8mqP0mFZebygsbClSt6xizaraR-pbK5XTa9f&s=10)', backgroundAttachment: 'fixed' }} 
    >


      <div className="relative p-4 pt-[3.5cm] flex justify-center border">
        <div className="flex justify-center flex-wrap gap-10">
          {products.map((product, index) => (<ProductCard key={index} {...product} />))}
        </div>
      </div>
    </div>
  );
}

const ProductCard = ({ name,price, quantity, link, image }) => {
  return (
    <Link href={link} className="w-72 pt-4 bg-white rounded-md box-shad shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
        <img src={image} alt={name} className="w-72 h-32 object-contain" />
        <div className="p-3 w-full">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">{price}/unit</p>
          <p className="text-sm text-gray-500">Available Quantity: {quantity}</p>


          <button  className="mt-3 w-full py-2 flex flex-row items-center justify-center gap-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
            <WhatsAppIcon className='w-8 h-8'/>
            Enquiry Now
          </button>
        </div>
    </Link>
  );
}

export default Page;
