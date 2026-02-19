import React from 'react'
import Image from 'next/image'

type Props = {}

const Hero = (props: Props) => {
  return (
    <div className='relative min-h-[60vh] sm:min-h-[75vh] lg:h-180 w-full overflow-hidden'>
      <Image
        src={'/assets/hero.jpg'}
        alt='Hero - Premium seeds for global agriculture'
        fill
        className='object-cover object-center'
        priority
        sizes='100vw'
      />
      <div className='absolute inset-0 bg-black/40 z-10' aria-hidden />
      <section className='h-full z-20 pt-28 pt-36 md:pt-44 pb-10 pb-16 md:pb-20 flex flex-col justify-between max-w-6xl mx-auto relative px-4 sm:px-6'>
        <div className='flex flex-col gap-3 sm:gap-4'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide text-white text-outline font-medium leading-tight sm:leading-snug md:leading-12 lg:leading-18'>
            PREMIUM SEEDS <br className='hidden sm:block' />
            FOR GLOBAL AGRICULTURE
          </h1>
          <p className='text-white text-sm sm:text-base md:text-lg tracking-wide max-w-xl'>
            Import export of speciality finest quality agricultural and food products
          </p>
        </div>
        <div className='flex flex-col gap-2 mt-6 sm:mt-0'>
          <div className='flex items-center gap-2 flex-wrap'>
            <div className='border border-white/80 px-3 py-1 rounded-2xl sm:px-4'>
              <span className='text-white text-xs sm:text-sm tracking-wider'>#Import</span>
            </div>
            <div className='border border-white/80 px-3 py-1 rounded-2xl sm:px-4'>
              <span className='text-white text-xs sm:text-sm tracking-wider'>#Relaibleshipping</span>
            </div>
          </div>
          <div className='flex items-center gap-2 flex-wrap'>
            <div className='border border-white/80 px-3 py-1 rounded-2xl sm:px-4'>
              <span className='text-white text-xs sm:text-sm tracking-wider'>#Bestproducts</span>
            </div>
            <div className='border border-white/80 px-3 py-1 rounded-2xl sm:px-4'>
              <span className='text-white text-xs sm:text-sm tracking-wider'>#Export</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero