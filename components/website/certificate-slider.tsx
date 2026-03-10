"use client"
import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { certificateSlides } from '@/data/certificateSlides'
import CertificateSlideCard from './certificate-slide-card'

export interface CertificateSliderProps {
  certificates?: { _id: string; image: string }[]
}

const CertificateSlider = ({ certificates }: CertificateSliderProps) => {
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const slides =
    Array.isArray(certificates) && certificates.length > 0
      ? certificates.map((c) => ({ id: c._id, image: c.image }))
      : certificateSlides

  return (
    <div className='py-10 px-4 sm:py-12 sm:px-6 md:py-16 md:px-8'>
      <section className='relative mx-auto max-w-6xl pl-10 pr-10 sm:pl-12 sm:pr-12 md:pl-14 md:pr-14'>
        <button
          ref={prevRef}
          type="button"
          aria-label="Previous certificates"
          className="absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white transition duration-300 hover:bg-black sm:p-1"
        >
          <ChevronLeft size={20} className="sm:w-[22px] sm:h-[22px]" aria-hidden />
        </button>
        <button
          ref={nextRef}
          type="button"
          aria-label="Next certificates"
          className="absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white transition duration-300 hover:bg-black sm:p-1"
        >
          <ChevronRight size={20} className="sm:w-[22px] sm:h-[22px]" aria-hidden />
        </button>

        <Swiper
          modules={[Navigation]}
          spaceBetween={12}
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
              spaceBetween: 16,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
        >
          {slides.map((cert) => (
            <SwiperSlide key={cert.id}>
              <CertificateSlideCard certificate={cert} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  )
}

export default CertificateSlider