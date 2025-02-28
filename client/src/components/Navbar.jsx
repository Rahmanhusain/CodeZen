'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 600);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className={`w-full h-20 fixed z-20 flex flex-row items-center justify-between px-24 ease-in-out transition-colors duration-300 ${scrolling ? 'bg-green-800 ' : 'bg-[#016630aa] '}  backdrop-blur-sm text-white `}
        >
            <div className={`logo flex flex-row items-center justify-start gap-4 h-full ${scrolling ? '' : 'bg-[#0000] '}  `}>
                <img
                    src="/logowhite.png"
                    alt='logo'
                    height={80}
                    width={80}
                    className='rounded-full h-full w-auto aspect-square p-2'
                />
                <h1 className={`text-2xl font-serif  text-white`}>EcoLoop</h1>
            </div>
            <nav className='flex flex-row gap-4 items-center '>
                <Link href="/">Home</Link>
                <Link href="/leaderboard">Leaderboard</Link>
                <Link href="/shop">Rate List</Link>
                <Link href="/blogs">Blog</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/schedulepickup" className='bg-white text-green-800 px-4 py-2 rounded-full'>Sell Items</Link>
                <Link href="/profile"><img src="/profile.png" width={50} height={50} alt="user profile" /></Link>
            </nav>
        </div>
    );
}

