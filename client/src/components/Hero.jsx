import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className='relative'>
      <img src="/hero.png" alt='main banner' className='w-full h-screen object-cover' />
      <div className='w-1/2 m-auto absolute top-1/2 left-1/2 -translate-1/2 text-center text-white '>
      <h1 className=' text-4xl font-bold leading-12 drop-shadow-2xl font-serif'>Smart Technology Powering a Revolutionary Circular Economy</h1>
      <p className='italic font-sans drop-shadow-2xl my-10'>"Innovative Tech Driving Sustainability: Transforming Waste into Value for a Greener Future"</p>

      <Link href="/schedulepickup" className='py-2 px-8 livvic bg-white text-green-800 mt-5 font-bold tracking-wider text-xl rounded-full'>Sell waste items</Link>
      </div>
    </div>
  )
}