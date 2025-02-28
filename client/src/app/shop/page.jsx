import Link from 'next/link';
import React from 'react';

const products = [
  { name: "Paper", quantity: "40kg", link: "/products/paper", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKr7KLRYm614imBxNtYkLLjl1vfL9XgnsqKzHahAdByRTB7RvZw-oXjMA&s=10" },
  { name: "Plastic", quantity: "30kg", link: "/products/plastic", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBgsdTzRtn-wntFZEn0GHJ4CJhdrTkQRMhQ4mP1VW0V1wSKJuVvfOi4Rri&s=10" },
  { name: "Glass", quantity: "10kg", link: "/products/glass", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRAuGU5S-sseZQ2prc5pdC-hZMp4gYCtelzg&usqp=CAU" },
  { name: "Cardboard", quantity: "25kg", link: "/products/cardboard", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGn-R9N5puxTUmWQaGItDxGyP2B74TCfkItw&usqp=CAU" },
  { name: "Wood", quantity: "15kg", link: "/products/wood", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLhAuBWJXqWhR9QUy5h_BjwaRLhoZRFG12q4rv2swE30E2gaF5L4Wkl5o&s=10" },
  { name: "Metal", quantity: "16kg", link: "/products/metal", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2W46QDQTxPWvO1VpJ9gRyaUyoFIdSF17pwQ&usqp=CAU" },
  { name: "Fabric", quantity: "50kg", link: "/products/fabric", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB4RbDtfqI_UpcBCPTjqfqjRhOBI-1BdXzhg&usqp=CAU" },
  { name: "Cotton", quantity: "32kg", link: "/products/cotton", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-mjg3WvHUD_svkkH6TXNfdz24XDD2vWg1Jw&usqp=CAU" },
];

function Page() {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
    //style={{ backgroundImage: 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvQbvZ2tN5uBhSxIj6_-Dc8mqP0mFZebygsbClSt6xizaraR-pbK5XTa9f&s=10)' }} 
    >


      <div className="relative p-4 pt-[3.5cm] flex justify-center border">
        <div className="flex justify-center flex-wrap gap-10">
          {products.map((product, index) => (<ProductCard key={index} {...product} />))}
        </div>
      </div>
    </div>
  );
}

const ProductCard = ({ name, quantity, link, image }) => {
  return (
    <div className="w-72 bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
      <Link href={link}>
        <img src={image} alt={name} className="w-72 h-32 object-contain" />
        <div className="p-3">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-500">Available Quantity: {quantity}</p>


          <Link href={link} className="mt-3 w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
            Enquiry
          </Link>
        </div>
      </Link>
    </div>
  );
}

export default Page;
