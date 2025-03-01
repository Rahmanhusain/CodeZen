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
        { name: "Newspaper", unit: "kg" ,price: "₹10" },
        { name: "Books", unit: "kg" ,price: "₹10" },
        { name: "Carton", unit: "kg" ,price: "₹10" },
        { name: "Magazines", unit: "kg" ,price: "₹7" },
        { name: "White Papers", unit: "kg" ,price: "₹7" },
        { name: "Used Beverage Carton", unit: "kg" ,price: "₹5" },
      ],
    },
    Plastic: {
      image: "https://www.thekabadiwala.com/images/scrap-prices/scrap-paper.webp",
      description: "Plastic scrap includes soft plastic, polythene, plastic jars, and fibre.",
      items: [
        { name: "Soft Plastic", unit: "kg" ,price: "₹6" },
        { name: "Hard Plastic", unit: "kg" ,price: "₹1" },
        { name: "Mix Plastic", unit: "kg" ,price: "₹4" },
        { name: "Milk Covers", unit: "kg" ,price: "₹2" },
        { name: "Plastic Jar (5ltr)", unit: "piece" ,price: "₹7 " },
        { name: "Plastic Jar (15ltr)", unit: "piece" ,price: "₹10 " },
      ],
    },
    Metal: {
      image: "https://www.thekabadiwala.com/images/scrap-prices/scrap-paper.webp",
      description: "Metal scrap includes iron, steel, aluminum, copper, and brass.",
      items: [
        { name: "Iron", unit: "kg" ,price: "₹20" },
        { name: "Steel", unit: "kg" ,price: "₹25" },
        { name: "Aluminum", unit: "kg" ,price: "₹50" },
        { name: "Copper", unit: "kg" ,price: "₹600" },
        { name: "Brass", unit: "kg" ,price: "₹450" },
      ],
    },
    "E-Waste": {
      image: "https://www.thekabadiwala.com/images/scrap-prices/scrap-paper.webp",
      description: "E-Waste includes discarded electronic items like laptops, batteries, wires, and appliances.",
      items: [
        { name: "Laptops", unit: "piece" ,price: "₹500 " },
        { name: "Mobile Phones", unit: "piece" ,price: "₹200 " },
        { name: "Computer Monitor", unit: "piece" ,price: "₹150 " },
        { name: "Old Batteries", unit: "kg" ,price: "₹80" },
        { name: "Wires & Cables", unit: "kg" ,price: "₹40" },
        { name: "Television", unit: "piece" ,price: "₹250 " },
      ],
    },
    Others: {
      image: "https://www.thekabadiwala.com/images/scrap-prices/scrap-paper.webp",
      description: "Miscellaneous scrap items such as glass, clothes, and wood.",
      items: [
        { name: "Glass Bottles", unit: "kg" ,price: "₹2" },
        { name: "Old Clothes", unit: "kg" ,price: "₹10" },
        { name: "Wooden Items", unit: "kg" ,price: "₹5" },
        { name: "Tyres", unit: "piece" ,price: "₹20 " },
        { name: "Rubber", unit: "kg" ,price: "₹15" },
        { name: "Electronic Accessories", unit: "kg" ,price: "₹50" },
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
                selectedCategory === category ? "bg-green-800 text-white" : "bg-green-200 text-black"
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
                    <div key={idx} className="bg-green-100 p-4 rounded-lg w-54 h-28 flex flex-col items-center justify-center  shadow-md">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-green-600">{item.price}/{item.unit}</p>
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
