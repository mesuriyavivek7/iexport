import React from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react';

type Props = {}

const Transaport = (props: Props) => {
  return (
    <div className='relative px-6 py-20'>
      <section className='mx-auto max-w-6xl grid grid-cols-2 items-center gap-8'>
      
      <div className="grid grid-cols-2 gap-4 h-105">
       {/* LEFT IMAGE - FULL HEIGHT */}
       <div className="relative h-full w-full overflow-hidden rounded-lg">
         <Image
          src="/assets/truck.jpg"
          alt="truck"
              fill
              className="object-cover"
              priority
            />
        </div>

         {/* RIGHT SIDE - TWO STACKED IMAGES */}
          <div className="grid grid-rows-2 gap-4 h-full">
    
            <div className="relative w-full h-full overflow-hidden rounded-lg">
              <Image
                src="/assets/ship.jpg"
                alt="ship"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative w-full h-full overflow-hidden rounded-lg">
              <Image
                src="/assets/cargo.jpg"
                alt="cargo"
                fill
                className="object-cover"
              />
            </div>

          </div>
         </div>

         <div className='flex flex-col gap-4'>
           <div className='border-b pb-4'>
             <h1 className='text-4xl leading-12 font-bold'> 
               <span className='text-[#082f49]'>Excellence in Every Trade, </span>
               <span className='text-[#B91C1C]'>Trust in Every Deal</span>
              </h1>
           </div>
           <div className='flex flex-col gap-2'>
             <p className='text-[#333333] text-[16px] leading-7'>Dartner with ue far unmatched quality rolichlo corvico and a commitment to delivering the best from nature to your doorstep, ensuring satisfaction and
              excellence every time</p>
           </div>
           <div className='grid grid-cols-2 items-center gap-4'>
             <div className='flex items-center gap-2'>
               <span className='bg-[#B91C1C] p-1 rounded-md'>
                 <Check size={22} className='text-white'></Check>
               </span>
               <span>Uncompromising Quality</span>
             </div>
             <div className='flex items-center gap-2'>
               <span className='bg-[#B91C1C] p-1 rounded-md'>
                 <Check size={22} className='text-white'></Check>
               </span>
               <span>On-Time Global Deliveries</span>
             </div>
             <div className='flex items-center gap-2'>
               <span className='bg-[#B91C1C] p-1 rounded-md'>
                 <Check size={22} className='text-white'></Check>
               </span>
               <span>Customer-Focused Solutions</span>
             </div>
             <div className='flex items-center gap-2'>
               <span className='bg-[#B91C1C] p-1 rounded-md'>
                 <Check size={22} className='text-white'></Check>
               </span>
               <span>Trusted Worldwide Network</span>
             </div>
             <div className='flex items-center gap-2'>
               <span className='bg-[#B91C1C] p-1 rounded-md'>
                 <Check size={22} className='text-white'></Check>
               </span>
               <span>Ethical & Sustainable Practices</span>
             </div>
             <div className='flex items-center gap-2'>
               <span className='bg-[#B91C1C] p-1 rounded-md'>
                 <Check size={22} className='text-white'></Check>
               </span>
               <span>Competitive Pricing Options</span>
             </div>
             <div className='flex items-center gap-2'>
               <span className='bg-[#B91C1C] p-1 rounded-md'>
                 <Check size={22} className='text-white'></Check>
               </span>
               <span>Grachnoce Chorantead</span>
             </div>
             <div className='flex items-center gap-2'>
               <span className='bg-[#B91C1C] p-1 rounded-md'>
                 <Check size={22} className='text-white'></Check>
               </span>
               <span>Evnort Team Cunnart</span>
             </div>
           </div>
         </div>

        </section>
    </div>
  )
}

export default Transaport