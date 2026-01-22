import React from 'react'
import Image from 'next/image'

type Props = {}

const Hero = (props: Props) => {
  return (
    <div className='relative h-180 w-screen'>
        <Image 
         src={'/assets/hero.jpg'}
         alt='hero'
         fill
        ></Image>
        <section className='h-full z-40 pt-44 pb-20 flex flex-col justify-between max-w-6xl mx-auto relative'>
          <div className='flex flex-col gap-4'>
            <h1 className='text-6xl tracking-wide text-white text-outline font-medium leading-18'>
              PREMIUM SEEDS <br></br>FOR GLOBAL AGRICULTURE
            </h1>
            <p className='text-white text-lg tracking-wide'>Import export of speciality finest quality agricultural and food products</p>
          </div>
          <div className='flex flex-col gap-2'>
             <div className='flex items-center gap-2'>
               <div className='border px-4 py-1 rounded-2xl'>
                  <span className='text-white text-sm tracking-wider'>#Import</span>
               </div>
               <div className='border px-4 py-1 rounded-2xl'>
                  <span className='text-white text-sm tracking-wider'>#Relaibleshipping</span>
               </div>
             </div>
             <div className='flex items-center gap-2'>
              <div className='border px-4 py-1 rounded-2xl'>
                  <span className='text-white text-sm tracking-wider'>#Bestproducts</span>
               </div>
               <div className='border px-4 py-1 rounded-2xl'>
                  <span className='text-white text-sm tracking-wider'>#Export</span>
               </div>
             </div>
          </div>
        </section>
        <div className='absolute inset-0 bg-black/40'></div>
        
    </div>
  )
}

export default Hero