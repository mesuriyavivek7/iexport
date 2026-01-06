'use client'
import React, {useRef} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'
import { homeSlides } from '@/data/homeSlides'
import SlideContent from './slide-content'

type Props = {}

const HomeCarousle = (props: Props) => {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  return (
    <section 
    className='h-full w-screen relative'
    >
         <button
        ref={prevRef}
        className="absolute left-6 top-1/2 z-20 -translate-y-1/2 
                   bg-black/50 text-white p-4 rounded-full 
                   hover:bg-black transition"
      >
        ←
      </button>

      <button
        ref={nextRef}
        className="absolute right-6 top-1/2 z-20 -translate-y-1/2 
                   bg-black/50 text-white p-4 rounded-full 
                   hover:bg-black transition"
      >
        →
      </button>
        <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        navigation
        onBeforeInit={(swiper) => {
            // @ts-ignore – Swiper typing limitation
            swiper.params.navigation.prevEl = prevRef.current
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
        loop
        className="md:h-5/6 h-4/6"
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