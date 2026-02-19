import React from 'react'
import Link from 'next/link'
import { Mail } from 'lucide-react'

const Contact = () => {
  return (
    <div className='relative py-12 md:py-20'>
      <div className='md:w-4/5 w-11/12 flex relative md:min-h-[220px] min-h-60 overflow-hidden lg:overflow-visible'>
        <div className='w-2/5 bg-linear-to-r from-[#8F6F3E] to-[#BFA06A] shrink-0' />
        <div className='w-3/5 rounded-r-2xl bg-linear-to-r from-[#0d2d47] to-[#0b4a6f] shrink-0' />

        {/* Mobile: stacked layout */}
        <div className='absolute inset-0 flex flex-col justify-center gap-4 p-4 sm:p-6 md:hidden'>
          <h1 className='md:text-xl text-2xl text-white font-bold leading-tight'>
            Ready to Expand Your Global Reach?
          </h1>
          <p className='text-white text-sm sm:text-base leading-6'>
            Partner with us for seamless import-export solutions. Contact us today to streamline your global trade operations!
          </p>
          <Link
            href='/contact'
            className='shadow-lg p-4 bg-white border rounded-2xl flex items-center gap-3 w-fit'
          >
            <Mail className='text-secondary shrink-0' size={24} aria-hidden />
            <div className='flex flex-col min-w-0'>
              <h2 className='text-base sm:text-lg font-bold'>Get Started Now</h2>
              <span className='text-[#9b9b9b] text-sm'>Discover our services!</span>
            </div>
          </Link>
        </div>

        {/* Desktop: side-by-side */}
        <div className='absolute -translate-y-1/2 top-1/2 left-8 lg:left-12 px-4 lg:px-8 hidden md:flex flex-col gap-3'>
          <h1 className='text-3xl lg:text-4xl text-white font-bold'>
            Ready to Expand Your Global Reach?
          </h1>
          <p className='text-white text-[17px] leading-7 max-w-xl'>
            Partner with us for seamless import-export solutions.
            <br className='hidden lg:block' />
            Contact us today to streamline your global trade operations!
          </p>
        </div>
        <Link
          href='/contact'
          className='absolute top-1/2 -translate-y-1/2 right-4 lg:-right-16 hidden md:flex shadow-lg p-4 px-6 bg-white border rounded-2xl items-center gap-4'
        >
          <Mail className='text-secondary shrink-0' size={26} aria-hidden />
          <div className='flex flex-col'>
            <h2 className='text-lg font-bold'>Get Started Now</h2>
            <span className='text-[#9b9b9b]'>Discover our services!</span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Contact