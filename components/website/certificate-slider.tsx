"use client"
import React, {useRef} from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { certificateSlides } from '@/data/certificateSlides'
import CertificateSlideCard from './certificate-slide-card'

type Props = {}

const CertificateSlider = (props: Props) => {

  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  return (
    <div className='py-16 px-8'>
    <section className='mx-auto max-w-6xl relative'>
      <button ref={prevRef} className="absolute cursor-pointer hover:bg-black  top-1/2 left-0 -traslate-y-1/2 z-20 bg-black/40 text-white p-1 rounded-full transition duration-300">
        <ChevronLeft size={22} />
      </button>

      <button ref={nextRef} className="absolute cursor-pointer hover:bg-black top-1/2 right-0 -traslate-y-1/2 z-20 bg-black/40 text-white p-1 rounded-full transition duration-300">
        <ChevronRight size={22} />
      </button>

      <Swiper 
      modules={[Navigation]}
      spaceBetween={24}
      slidesPerView={6}
      onBeforeInit={(swiper) => {
        // @ts-ignore
        swiper.params.navigation.prevEl = prevRef.current
        // @ts-ignore
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
       {
        certificateSlides.map((cert)=>(
           <SwiperSlide key={cert.id}>
             <CertificateSlideCard
               certificate={cert}
             ></CertificateSlideCard>
           </SwiperSlide>
        ))
       }
      </Swiper>

    </section>
    </div>
  )
}

export default CertificateSlider