import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <div className='bg-[#041d2d] px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-16'>
      <section className='mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-start gap-10 sm:gap-12 lg:gap-16'>
        {/* Logo & about */}
        <div className='flex flex-col gap-4 sm:col-span-2 lg:col-span-1'>
          <Image
            alt='logo'
            height={90}
            width={200}
            src={'/assets/whlogo.png'}
            className='h-14 w-auto sm:h-16 lg:h-[90px] object-contain object-left'
          />
          <p className='text-[#adb6c0] leading-7 text-[15px] sm:text-[17px] tracking-wide max-w-md'>
            We are a trusted supplier and trader, delivering premium-
            quality products globally with a commitment to freshness,
            reliability, and customer satisfaction
          </p>
        </div>

        {/* Our expertise */}
        <div>
          <h2 className='text-base sm:text-lg relative inline-block text-white tracking-widest font-semibold'>
            OUR EXPERTISE
            <hr className='h-1 border-none mt-3 sm:mt-4 w-full bg-[#2c3d4f]'/>
          </h2>
          <div className='flex mt-3 sm:mt-4 flex-col gap-2'>
            <span className='text-[#adb6c0] text-sm sm:text-base'>Fruits & Vegetables</span>
            <span className='text-[#adb6c0] text-sm sm:text-base'>Spices</span>
            <span className='text-[#adb6c0] text-sm sm:text-base'>Coffee</span>
            <span className='text-[#adb6c0] text-sm sm:text-base'>Rice</span>
            <span className='text-[#adb6c0] text-sm sm:text-base'>Multi Products</span>
          </div>
        </div>

        {/* Useful links */}
        <div>
          <h2 className='text-base sm:text-lg relative inline-block text-white tracking-widest font-semibold'>
            USEFUL LINKS
            <hr className='h-1 border-none mt-3 sm:mt-4 w-full bg-[#2c3d4f]'/>
          </h2>
          <div className='flex mt-3 sm:mt-4 flex-col gap-2'>
            <Link className='text-[#adb6c0] text-sm sm:text-base hover:text-white transition-colors py-1' href='/'>Home</Link>
            <Link className='text-[#adb6c0] text-sm sm:text-base hover:text-white transition-colors py-1' href='/categories'>Products</Link>
            <Link className='text-[#adb6c0] text-sm sm:text-base hover:text-white transition-colors py-1' href='/about'>About</Link>
            <Link className='text-[#adb6c0] text-sm sm:text-base hover:text-white transition-colors py-1' href='/contact'>Contact</Link>
          </div>
        </div>

        {/* Contact info */}
        <div className='sm:col-span-2 lg:col-span-1'>
          <h2 className='text-base sm:text-lg relative inline-block text-white tracking-widest font-semibold'>
            CONTACT INFO
            <hr className='h-1 border-none mt-3 sm:mt-4 w-full bg-[#2c3d4f]'/>
          </h2>
          <div className='flex mt-3 sm:mt-4 flex-col gap-4 sm:gap-6'>
            <div className='flex items-center gap-3'>
              <span className='p-1.5 sm:p-1 bg-white rounded-md shrink-0'>
                <Phone size={20} className='text-[#041d2d] sm:w-[22px] sm:h-[22px]' aria-hidden />
              </span>
              <div className='flex flex-col min-w-0'>
                <span className='text-white text-sm sm:text-base'>Patel Jainish</span>
                <a href='tel:+916355007570' className='text-[#adb6c0] text-sm hover:text-white transition-colors'>+91 6355007570</a>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <span className='p-1.5 sm:p-1 bg-white rounded-md shrink-0'>
                <Phone size={20} className='text-[#041d2d] sm:w-[22px] sm:h-[22px]' aria-hidden />
              </span>
              <div className='flex flex-col min-w-0'>
                <span className='text-white text-sm sm:text-base'>Patel Yagnik</span>
                <a href='tel:+919925867065' className='text-[#adb6c0] text-sm hover:text-white transition-colors'>+91 9925867065</a>
              </div>
            </div>
            <div className='flex items-start gap-3'>
              <span className='p-1.5 sm:p-1 bg-white rounded-md shrink-0 mt-0.5'>
                <Mail size={20} className='text-[#041d2d] sm:w-[22px] sm:h-[22px]' aria-hidden />
              </span>
              <a href='mailto:procureexport24@gmail.com' className='text-[#adb6c0] text-sm sm:text-base hover:text-white transition-colors break-all'>procureexport24@gmail.com</a>
            </div>
            <div className='flex items-start gap-3'>
              <span className='p-1.5 sm:p-1 bg-white rounded-md shrink-0 mt-0.5'>
                <MapPin size={20} className='text-[#041d2d] sm:w-[22px] sm:h-[22px]' aria-hidden />
              </span>
              <span className='text-[#adb6c0] text-sm sm:text-base leading-snug'>584, Patel Vas, First Line, Ralisana, Visnagar, Mahesana</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Footer