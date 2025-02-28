"use client"
import { useState } from "react";

export default function Ratelist() {
  const categories = ["All", "Paper", "Plastic", "Metal", "E-Waste", "Others"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Scrap data
  const scrapItems = {
    Paper: {
      image: "https://www.thekabadiwala.com/images/scrap-prices/scrap-paper.webp",
      description: "Paper scrap includes newspapers, books, cartons, magazines, and beverage cartons.",
      items: [
        { name: "Newspaper", price: "₹10 /Kg" },
        { name: "Books", price: "₹10 /Kg" },
        { name: "Carton", price: "₹10 /Kg" },
        { name: "Magazines", price: "₹7 /Kg" },
        { name: "White Papers", price: "₹7 /Kg" },
        { name: "Used Beverage Carton", price: "₹5 /Kg" },
      ],
    },
    Plastic: {
      image: "https://www.thekabadiwala.com/images/scrap-prices/scrap-paper.webp",
      description: "Plastic scrap includes soft plastic, polythene, plastic jars, and fibre.",
      items: [
        { name: "Soft Plastic", price: "₹6 /Kg" },
        { name: "Hard Plastic", price: "₹1 /Kg" },
        { name: "Mix Plastic", price: "₹4 /Kg" },
        { name: "Milk Covers", price: "₹2 /Kg" },
        { name: "Plastic Jar (5ltr)", price: "₹7 /Piece" },
        { name: "Plastic Jar (15ltr)", price: "₹10 /Piece" },
      ],
    },
    Metal: {
      image: "https://www.thekabadiwala.com/images/scrap-prices/scrap-paper.webp",
      description: "Metal scrap includes iron, steel, aluminum, copper, and brass.",
      items: [
        { name: "Iron", price: "₹20 /Kg" },
        { name: "Steel", price: "₹25 /Kg" },
        { name: "Aluminum", price: "₹50 /Kg" },
        { name: "Copper", price: "₹600 /Kg" },
        { name: "Brass", price: "₹450 /Kg" },
      ],
    },
    "E-Waste": {
      image: "https://www.thekabadiwala.com/images/scrap-prices/scrap-paper.webp",
      description: "E-Waste includes discarded electronic items like laptops, batteries, wires, and appliances.",
      items: [
        { name: "Laptops", price: "₹500 /Piece" },
        { name: "Mobile Phones", price: "₹200 /Piece" },
        { name: "Computer Monitor", price: "₹150 /Piece" },
        { name: "Old Batteries", price: "₹80 /Kg" },
        { name: "Wires & Cables", price: "₹40 /Kg" },
        { name: "Television", price: "₹250 /Piece" },
      ],
    },
    Others: {
      image: "https://www.thekabadiwala.com/images/scrap-prices/scrap-paper.webp",
      description: "Miscellaneous scrap items such as glass, clothes, and wood.",
      items: [
        { name: "Glass Bottles", price: "₹2 /Kg" },
        { name: "Old Clothes", price: "₹10 /Kg" },
        { name: "Wooden Items", price: "₹5 /Kg" },
        { name: "Tyres", price: "₹20 /Piece" },
        { name: "Rubber", price: "₹15 /Kg" },
        { name: "Electronic Accessories", price: "₹50 /Kg" },
      ],
    },
  };
  
  return (
    <div className="bg-white text-black min-h-screen p-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 justify-center mb-6 px-32">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`px-4 py-4 cursor-pointer mb-6 flex-grow rounded-lg transition-all duration-300 ${
                selectedCategory === category ? "bg-green-800 text-white" : "bg-gray-200 text-black"
            } hover:bg-green-800 hover:text-white`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Scrap Material Sections */}
      <div className="px-32 mx-auto space-y-10">
        {Object.entries(scrapItems).map(([category, data], index) => {
          if (selectedCategory !== "All" && selectedCategory !== category) return null;
          return (
            <>
              <div key={index} className="h-fit flex flex-wrap gap-5">
                {/* Section Header */}
                <div className="flex flex-col gap-2 w-[266px]">
                  <img
                    src={data.image}
                    alt={`${category} Scrap`}
                    className="w-[266px] aspect-square object-cover rounded-lg"
                  />
                  <div>
                    <h2 className="text-2xl font-semibold">{category}</h2>
                    <p className="text-gray-600 text-sm">{data.description}</p>
                  </div>
                </div>

                {/* Price Cards */}
                <div className="grid grid-cols-4  justify-start gap-4">
                  {data.items.map((item, idx) => (
                    <div key={idx} className="bg-gray-100 p-4 rounded-lg w-54 h-28 flex flex-col items-center justify-center  shadow-md">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-green-600">{item.price}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-b border-gray-300 text-center text-gray-400 py-6">Note: For Bulk scrap (Commercial) prices may vary.</div>
            </>
          );
        })}
      </div>
    </div>
  );
}
