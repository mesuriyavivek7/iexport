'use client'
import React, {useRef} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'
import { homeSlides } from '@/data/homeSlides'
import SlideContent from './slide-content'

const HomeCarousle = () => {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  return (
    <section 
    className='h-160 w-screen relative'
    >
         <button
        ref={prevRef}
        className="absolute cursor-pointer left-6 top-1/2 z-20 -translate-y-1/2 
                   bg-black/40 text-white p-4 rounded-full 
                   hover:bg-black transition"
      >
        <ChevronLeft></ChevronLeft>
      </button>

      <button
        ref={nextRef}
        className="absolute cursor-pointer right-6 top-1/2 z-20 -translate-y-1/2 
                   bg-black/40 text-white p-4 rounded-full 
                   hover:bg-black transition"
      >
        <ChevronRight></ChevronRight>
      </button>
        <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        loop
        onBeforeInit={(swiper) => {
            // @ts-expect-error - Swiper types don't expose navigation ref assignment
            swiper.params.navigation.prevEl = prevRef.current
            // @ts-expect-error - Swiper types don't expose navigation ref assignment
            swiper.params.navigation.nextEl = nextRef.current
        }}
        navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
        }}
        className='h-full w-full'
        >
            {
                homeSlides.map(slide => (
                    <SwiperSlide key={slide.id}>
                        <SlideContent slide={slide}></SlideContent>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    </section>
  )
}

export default HomeCarousle