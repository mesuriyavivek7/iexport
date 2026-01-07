import React from 'react'
import Image from 'next/image'
import { slide } from '@/data/homeSlides'


const SlideContent = ({slide} : {slide:slide}) => {
  return (
    <div
    className='relative h-full w-screen'
    >
        <div className='absolute z-20 bg-black/50 inset-0'>
        </div>
        <Image
         fill
         className='object-cover'
         alt={slide.title}
         src={slide.image}
        ></Image>

        <div className='absolute z-50 inset-0 flex items-center justify-center text-center p-6'>
         <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {slide.title}
          </h1>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            {slide.description}
          </p>
          <button className="px-6 cursor-pointer py-3 bg-[#921314] hover:bg-[#B91C1C] text-white font-semibold transition">
            {slide.cta}
          </button>
         </div>
        </div>

    </div>
  )
}

export default SlideContent