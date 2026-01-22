import React from 'react'
import Image from 'next/image'

type Props = {}

const About = (props: Props) => {
  return (
    <div className='px-8 py-16'>
      <section className='mx-auto max-w-6xl'>
        <div className='flex flex-col items-center gap-4'>
           <span className='text-lg text-[#9b9b9b] font-medium'>ABOUT US</span>
           <h1 className='text-5xl leading-12 font-bold'>
              <span className='text-primary'>Building trust through </span>
              <span className='text-secondary'>global trade</span>
           </h1>
           <p className='text-center w-3xl text-[16px] text-[#333333] leading-7'>We are a reliable import–export partner delivering quality sand and seeds with a focus on trust, compliance, and global reach.</p>
        </div>
        <div className='grid mt-28 grid-cols-2 items-center gap-20'>

           <div className="relative h-full w-full overflow-hidden">
             <Image
                src="/assets/aboutpage.png"
                alt="about"
                fill
                className="object-cover"
                priority
              />
           </div>

           <div className='flex flex-col gap-2'>
             <h2 className='text-lg leading-12 font-semibold'>About Procure Export</h2>
             <p className='text-[#333333] text-[16px] leading-7'>Procure Export connects global buyers with premium agricultural products, spices, and food grains. We focus on smart sourcing, quality assurance, and efficient logistics to make global trade simple and reliable.</p>
             <p className='text-[#333333] text-[16px] leading-7'>Built on trust and transparency, we work closely with farmers, suppliers, and logistics partners to deliver products that meet international standards—on time, every time.</p>
           </div>
           
        </div>

        <div className='grid mt-20 grid-cols-3 items-stretch gap-6'>
           <div className='relative rounded-2xl flex bg-[#f1f5f9] flex-col justify-center items-center p-8  gap-2'>
              <h2 className='text-primary'>Vision</h2>
              <p className='text-center text-[#334155] text-[15px] leading-6'>
               To redefine agricultural exports through innovation, quality, and global partnerships.
              </p>
           </div>
           <div className='relative rounded-2xl flex bg-[#f1f5f9] flex-col justify-center items-center p-8 gap-2 '>
              <h2 className='text-primary'>Mission</h2>
              <p className='text-center text-[#334155] text-[15px] leading-6'>
               To provide reliable export solutions by sourcing the best products and delivering them efficiently to global markets.
              </p>
           </div>
           <div className='relative rounded-2xl flex bg-[#f1f5f9] flex-col justify-center items-center p-8 gap-2'>
              <h2 className='text-primary'>Ambition</h2>
              <p className='text-center text-[#334155] text-[15px] leading-6'>
               To rapidly expand our global export footprint, strengthen supplier networks, and position Procure Export as a preferred partner in international trade.
              </p>
           </div>
        </div>
      </section>
    </div>
  )
}

export default About