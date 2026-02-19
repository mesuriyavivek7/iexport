"use client"
import React, {useRef} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { categories } from '@/data/category'
import CategoryCard from './category-card'

const ProductSlider = () => {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  return (
    <section className="relative py-8 px-8">
      {/* Custom arrows */}
      <button ref={prevRef} className="absolute cursor-pointer hover:bg-black  top-1/2 left-0 -traslate-y-1/2 z-20 bg-black/40 text-white p-1 rounded-full transition duration-300">
        <ChevronLeft size={22} />
      </button>

      <button ref={nextRef} className="absolute cursor-pointer hover:bg-black top-1/2 right-0 -traslate-y-1/2 z-20 bg-black/40 text-white p-1 rounded-full transition duration-300">
        <ChevronRight size={22} />
      </button>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={4}
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
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id}>
            <CategoryCard category={category}></CategoryCard>
          </SwiperSlide>
        ))}
      </Swiper>

      

    </section>
  )
}

export default ProductSlider