import React from 'react'

export default function About() {
    return (
        <div className=' w-full text-center my-14'>
            <img src="/image.png" alt="icon-logo" width={50} height={50} className='m-auto mb-6 rounded-full' />
            <h1 className='text-3xl font-bold font-serif text-green-900 mb-2'>Welcome to SRTC</h1>
            <h2 className='uppercase text-xs tracking-widest  mb-10 text-green-900 font-sans'>More About Us</h2>
            <p className='w-1/2 m-auto leading-7  text-gray-600 text-lg font-thin'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni laudantium consequuntur distinctio eius voluptas quisquam beatae cupiditate modi debitis commodi, consectetur dolorum pariatur dignissimos explicabo aliquid dolorem? Reprehenderit eveniet quibusdam mollitia esse velit. Eos, debitis! Eaque blanditiis odio modi veritatis, odit ducimus quos perferendis numquam nobis quod sapiente vel vero.</p>
            <div className='flex flex-row gap-8 items-center justify-center px-32'>
                <div className='border border-gray-400 relative h-60 mt-10 w-auto flex items-center justify-center flex-col px-4 rounded-lg'>
                    <div className='h-20 -top-10 absolute aspect-square bg-green-700 flex items-center justify-center p-6 rounded-full'>

                        <img src="/logo.png" alt="apple" width={80} height={80} className='m-4' />
                    </div>
                    <h2 className='text-xl mb-3'>E-waste Events</h2>
                    <p className='text-gray-500 '>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem eius vero dolorem, hic soluta deserunt.</p>
                </div>
                <div className='border border-gray-400 relative h-60 mt-10 w-auto flex items-center justify-center flex-col px-4'>
                    <div className='h-20 -top-10 absolute aspect-square bg-green-700 flex items-center justify-center p-6 rounded-full'>

                        <img src="/logo.png" alt="apple" width={80} height={80} className='m-4' />
                    </div>
                    <h2 className='text-xl mb-3'>E-waste Events</h2>
                    <p className='text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem eius vero dolorem, hic soluta deserunt.</p>
                </div>
                <div className='border border-gray-400 relative h-60 mt-10 w-auto flex items-center justify-center flex-col px-4'>
                    <div className='h-20 -top-10 absolute aspect-square bg-green-700 flex items-center justify-center p-6 rounded-full'>

                        <img src="/logo.png" alt="apple" width={80} height={80} className='m-4' />
                    </div>
                    <h2 className='text-xl mb-3'>E-waste Events</h2>
                    <p className='text-gray-500'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rem eius vero dolorem, hic soluta deserunt.</p>
                </div>

            </div>
        </div>
    )
}