import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

export interface AboutProps {
  data?: {
    aboutImage: string
    heading: string
    subheading: string
    contentParagraph1: string
    contentParagraph2: string
  } | null
}

const defaultSubheading = 'ABOUT PROCURE EXPORT'
const defaultHeading = 'Your Trusted Partner in International Trade.'
const defaultP1 = 'Welcome to Procure Exports, your trusted partner in delivering the finest quality agricultural and food products to markets worldwide. With a passion for excellence and a commitment to global trade, we specialize in the export of premium fruits and vegetables, authentic spices, aromatic coffee, and high-grade rice.'
const defaultP2 = "At Procure Exports, we believe in connecting cultures through the richness of food and agriculture. Our carefully sourced products are cultivated with care, meeting the highest standards of quality and freshness. Whether it's the vibrant flavors of fresh produce, the bold aroma of our spices, the rich taste of coffee, or the superior quality of our rice, we ensure every product reflects our dedication to excellence."
const defaultImage = '/assets/about.png'

const About = ({ data }: AboutProps) => {
  const image = data?.aboutImage || defaultImage
  const subheading = data?.subheading ?? defaultSubheading
  const heading = data?.heading ?? defaultHeading
  const p1 = data?.contentParagraph1 ?? defaultP1
  const p2 = data?.contentParagraph2 ?? defaultP2

  return (
    <div className='px-6 py-12 md:px-8 md:py-20'>
      <section className='mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-4'>
        <div className='flex justify-center items-center'>
          <div className='relative w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[480px] aspect-square'>
            <Image
              alt='About Procure Export - International trade'
              fill
              src={image}
              className='object-contain'
              sizes='(max-width: 640px) 280px, (max-width: 1024px) 340px, 480px'
              unoptimized={image.startsWith('http')}
            />
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <h4 className='text-lg text-[#9b9b9b] text-center md:text-left font-medium'>{subheading}</h4>
          <h1 className='text-3xl md:text-4xl text-center md:text-left font-bold leading-10 md:leading-12'>
            <span className='text-primary'>
              {heading.includes(' in ') ? heading.substring(0, heading.lastIndexOf(' in ') + 3) : heading}{' '}
            </span>
            <br className='hidden sm:block' />
            <span className='text-secondary'>
              {heading.includes(' in ') ? heading.substring(heading.lastIndexOf(' in ') + 4).trim() : ''}
            </span>
          </h1>
          <div className='flex flex-col gap-3 sm:gap-2'>
            <p className='text-[#333333] text-center md:text-left text-sm sm:text-base leading-6 sm:leading-7'>
              {p1}
            </p>
            <p className='text-[#333333] text-center md:text-left text-sm sm:text-base leading-6 sm:leading-7'>
              {p2}
            </p>
          </div>
          <Link href={'/about'} className='flex justify-center md:justify-start items-center w-auto'>
            <Button size={'lg'} className='w-48 group btn-primary font-bold cursor-pointer'>
              Read More Details
              <ChevronRight className='group-hover:translate-x-2 transition-all duration-300' />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default About
