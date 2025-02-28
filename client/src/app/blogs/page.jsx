import React from 'react';

const EcoVibes = () => {
  return (
    <div className="bg-gray-100 text-gray-900">
      {/* Navbar */}
      <nav className="bg-green-600 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-xl font-bold">Eco vibes</h1>
          <ul className="flex space-x-4">
            <li><a href="#" className="text-white hover:underline">Home</a></li>
            <li><a href="#" className="text-white hover:underline">About</a></li>
            <li><a href="#" className="text-white hover:underline">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-green-700 text-white text-center py-16">
        <h2 className="text-4xl sm:text-6xl lg:text-8xl font-bold">TRASH INTO TREASURE</h2>
        <p className="mt-4 text-lg sm:text-2xl lg:text-4xl">Let's rewrite the story of waste into a beautiful way..</p>
      </header>

      {/* Blog Posts */}
      <main className="container mx-auto py-10 px-4">
        <p className="text-lg sm:text-xl mb-6 italic">
          Ever wonder what happens to that empty soda bottle once you toss it in the bin? You might think it vanishes, but in reality, it embarks on a wild journey. Some bottles are lucky—they get recycled into brand new products, and some end up in landfills. What if that bottle could be reborn as a sleek glass lamp or a stylish planter? That’s where upcycling comes in. Instead of waste disappearing into pollution, we give it a second life—one that’s both beautiful and useful...
        </p>

        {/* Grid of Blog Posts */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-gray-200 p-6 rounded-lg padded shadow-md h-fit">
          <h2 className='font-bold text-xl text-center'>Household waste to handmade crafted products</h2>
           <p className='italic text-lg text-center my-3 leading-8'>We believe that everyday waste-like glass bottles,old clothes and plastic containers has the potential for a second life.
            Through our platform,household's can donate recyclable materials and skilled artisians can transform them into unique,handcrafted items.
           </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg h-fit shadow-md">
            <img className="w-full h-auto mb-4" src="/recycle.jpg" alt="Recycling Process" />
          </div>

          {/* Card 3 */}
          <div className="bg-grey p-6 rounded-xl shadow-md text-center h-fit">
          <h2 className='font-bold text-xl my-3'>Join the movement</h2>
      
      <p className='text-lg italic '><strong>Donate your waste:</strong> Instead of throwing things away, list them on our platform and connect with people who can repurpose them.</p>

      <p className='text-lg italic'><strong>Shop Upcycled Products:</strong> Browse a variety of handmade, sustainable items that help reduce waste.</p>

      <p className='text-lg italic'><strong>Support Local Artisans:</strong> By buying upcycled products, you support small businesses and eco-friendly innovation.</p>

      <p className='text-lg italic'><strong>Inspire changes:</strong> Share your upcycling journey! Every repurposed item is a step toward a cleaner, greener planet.</p>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-green-600 text-white text-center py-6 mt-10">
        <p>&copy; 2025 Eco Vibes. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default EcoVibes;