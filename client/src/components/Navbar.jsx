
import Link from 'next/link'
import React from 'react'

export default function Navbar() {
    return (
        <div className='w-full h-20 bg-[#0002] backdrop-blur-sm text-white flex flex-row fixed items-center justify-between px-24'>
            <div className="logo flex flex-row items-center justify-start gap-4 h-full">
                <img src="/image.png" alt='nothing' height={80} width={80}  className='rounded-full h-full w-auto aspect-square p-2'/>
                <h1 className='text-2xl italic'>Smart Recycling Software</h1>
            </div>
            <nav className='flex flex-row gap-4'> 
                <Link href="/">Home</Link>
                <Link href="/">Services</Link>
                <Link href="/">Shop</Link>
                <Link href="/">Blog</Link>
                <Link href="/">Contact</Link>
            </nav>
        </div>
    )
}
