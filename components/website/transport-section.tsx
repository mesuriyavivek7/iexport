import React from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'

export interface TransaportProps {
  data?: {
    image1: string
    image2: string
    image3: string
    heading: string
    paragraph: string
    points: string[]
  } | null
}

const defaultImages = ['/assets/truck.jpg', '/assets/ship.jpg', '/assets/cargo.jpg']
const defaultHeading = 'Excellence in Every Trade, Trust in Every Deal'
const defaultParagraph = 'Partner with us for unmatched quality and a commitment to delivering the best from nature to your doorstep, ensuring satisfaction and excellence every time.'
const defaultPoints = [
  'Uncompromising Quality',
  'On-Time Global Deliveries',
  'Customer-Focused Solutions',
  'Trusted Worldwide Network',
  'Ethical & Sustainable Practices',
  'Competitive Pricing Options',
  'Performance Guaranteed',
  'Expert Team Support',
]

const Transaport = ({ data }: TransaportProps) => {
  const image1 = data?.image1 || defaultImages[0]
  const image2 = data?.image2 || defaultImages[1]
  const image3 = data?.image3 || defaultImages[2]
  const heading = data?.heading ?? defaultHeading
  const paragraph = data?.paragraph ?? defaultParagraph
  const points = Array.isArray(data?.points) && data.points.length > 0 ? data.points : defaultPoints
  const headingParts = heading.split(',').map((s) => s.trim()).filter(Boolean)

  return (
    <div className='relative px-6 py-12 md:px-8 md:py-20'>
      <section className='mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 items-center gap-6 lg:gap-8'>
        <div className='grid grid-cols-1 grid-rows-3 lg:grid-cols-2 lg:grid-rows-2 gap-3 lg:gap-4 min-h-[360px] lg:min-h-0 lg:h-105'>
          <div className='relative w-full min-h-[120px] lg:min-h-0 overflow-hidden rounded-lg lg:row-span-2'>
            <Image
              src={image1}
              alt='Truck transport'
              fill
              className='object-cover'
              priority
              sizes='(max-width: 1024px) 100vw, 50vw'
              unoptimized={image1.startsWith('http')}
            />
          </div>
          <div className='relative w-full min-h-[120px] lg:min-h-0 overflow-hidden rounded-lg'>
            <Image
              src={image2}
              alt='Ship transport'
              fill
              className='object-cover'
              sizes='(max-width: 1024px) 100vw, 50vw'
              unoptimized={image2.startsWith('http')}
            />
          </div>
          <div className='relative w-full min-h-[120px] lg:min-h-0 overflow-hidden rounded-lg'>
            <Image
              src={image3}
              alt='Cargo transport'
              fill
              className='object-cover'
              sizes='(max-width: 1024px) 100vw, 50vw'
              unoptimized={image3.startsWith('http')}
            />
          </div>
        </div>

        <div className='flex flex-col gap-4'>
          <div className='border-b border-border pb-4'>
            <h1 className='text-3xl md:text-4xl font-bold leading-tight sm:leading-10 md:leading-12'>
              {headingParts.length >= 2 ? (
                <>
                  <span className='text-primary'>{headingParts[0]}, </span>
                  <br className='sm:hidden' />
                  <span className='text-secondary'>{headingParts.slice(1).join(', ')}</span>
                </>
              ) : (
                <span className='text-primary'>{heading}</span>
              )}
            </h1>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-[#333333] text-sm sm:text-base leading-6 sm:leading-7'>
              {paragraph}
            </p>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 items-start gap-3 sm:gap-4'>
            {points.map((label) => (
              <div key={label} className='flex items-center gap-2'>
                <span className='bg-(--color-secondary-blue) p-1 rounded-md shrink-0'>
                  <Check size={20} className='text-white sm:w-[22px] sm:h-[22px]' aria-hidden />
                </span>
                <span className='text-sm sm:text-base text-foreground'>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Transaport
