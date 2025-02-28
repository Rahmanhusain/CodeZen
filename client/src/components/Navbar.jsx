'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 700);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className={`w-full h-20 fixed z-10 flex flex-row items-center justify-between px-24 transition-colors duration-300 ${scrolling ? 'bg-green-900' : 'bg-[#0002]'} backdrop-blur-sm text-white`}
        >
            <div className="logo flex flex-row items-center justify-start gap-4 h-full">
                <img
                    src="/image.png"
                    alt='nothing'
                    height={80}
                    width={80}
                    className='rounded-full h-full w-auto aspect-square p-2'
                />
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
    );
}

// The navbar will now start with a light background and turn darker when you scroll! Let me know if you want me to tweak the colors or add anything else. 🚀
