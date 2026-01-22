"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {}

const Header = (props: Props) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(()=>{
    const handleScroll = () =>{
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll)
  },[])
  return (
    <div className={`py-2 overflow-hidden z-50 shadow backdrop-blur-sm ${isScrolled ? "bg-[#082F49]/30" : "bg-[#f1f5f9]/10"} transition-all duration-300 fixed top-0 left-0 right-0`}>
       <section className='flex justify-between items-center mx-auto max-w-6xl'>
       <div>
          <Image 
           alt='Logo'
           height={80}
           width={180}
           src={'/assets/whlogo.png'}>
          </Image>
       </div>
       <nav className='hidden md:block'>
         <ul className='flex items-center justify-center gap-8'>
            <Link className='font-medium text-white transition-all tracking-wide duration-300  hover:text-(--color-secondary-blue)' href='/'>HOME</Link>
            <Link className='font-medium transition-all duration-300 tracking-wide text-white hover:text-(--color-secondary-blue)' href='/products'>PRODUCTS</Link>
            <Link className='font-medium transition-all duration-300 tracking-wide text-white hover:text-(--color-secondary-blue)' href='/about'>ABOUT US</Link>
            <Link className='font-medium transition-all duration-300 tracking-wide text-white hover:text-(--color-secondary-blue)' href='/contact'>CONTACT US</Link>
         </ul>
       </nav>
       </section>
    </div>
  )
}

export default Header