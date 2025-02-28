import React from 'react'

export default function Services() {
    return (
        <div className='text-center mt-20'>
            <img src="/logo.png" alt="" className='h-14 m-auto' />
            <h1 className='text-4xl font-serif text-green-800'>Services</h1>
            <p className='text-green-800 mb-10'>What we do</p>

            <div className='flex flex-row items-center justify-center gap-10 mt-10'>
                <div className='w-1/3 box-shad border border-gray-200 p-4 rounded-2xl  px-8'>
                    <h1 className='text-xl font-sans font-bold text-green-800 mb-2'>Buy Wastes from Households</h1>
                    <img src="/waste.png" alt="" className='h-64 w-full object-cover rounded-xl m-auto my-2' />
                    <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem magnam itaque animi libero quod numquam voluptatum excepturi, ullam laudantium voluptas veniam eveniet illum fugiat qui commodi ut officiis? Eum provident nulla natus sapiente esse deleniti iste sunt iure quis doloribus! Pariatur dolore veritatis dolores labore aut dignissimos repudiandae dolor quas.
                        
                    </p>
                </div>
                <div className='w-1/3 box-shad border border-gray-200 p-4 rounded-2xl  px-8'>
                    <h1 className='text-xl font-sans font-bold text-green-800 mb-2'>Micro-Businesses can buy recyclable products</h1>
                    <img src="/rec.png" alt="" className='h-64 w-full object-cover rounded-xl m-auto my-2' />
                    <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem magnam itaque animi libero quod numquam voluptatum excepturi, ullam laudantium voluptas veniam eveniet illum fugiat qui commodi ut officiis? Eum provident nulla natus sapiente esse deleniti iste sunt iure quis doloribus! Pariatur dolore veritatis dolores labore aut dignissimos repudiandae dolor quas.
                        
                    </p>
                </div>
                
            </div>
        </div>
    )
}
