import React from 'react'
import Image from 'next/image'

export default function Hero() {
  return (
    <div>
      <img src="/hero.png" alt='main banner'  className='w-full h-screen object-cover'/>
    </div>
  )
}