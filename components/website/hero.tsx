import React from 'react'
import Image from 'next/image'

export interface HeroProps {
  data?: {
    heroImage: string
    heading: string
    subheading: string
    tags: string[]
  } | null
}

const defaultHeading = 'PREMIUM SEEDS\nFOR GLOBAL AGRICULTURE'
const defaultSubheading = 'Import export of speciality finest quality agricultural and food products'
const defaultTags = ['#Import', '#Relaibleshipping', '#Bestproducts', '#Export']
const defaultImage = '/assets/hero.jpg'

const Hero = ({ data }: HeroProps) => {
  const image = data?.heroImage || defaultImage
  const heading = data?.heading ?? defaultHeading
  const subheading = data?.subheading ?? defaultSubheading
  const tags = Array.isArray(data?.tags) && data.tags.length > 0 ? data.tags : defaultTags
  const headingLines = heading.split('\\n').join('\n').split('\n').filter(Boolean)

  return (
    <div className='relative min-h-[60vh] sm:min-h-[75vh] lg:h-180 w-full overflow-hidden'>
      <Image
        src={image}
        alt='Hero - Premium seeds for global agriculture'
        fill
        className='object-cover object-center'
        priority
        sizes='100vw'
        unoptimized={image.startsWith('http')}
      />
      <div className='absolute inset-0 bg-black/40 z-10' aria-hidden />
      <section className='h-full z-20 pt-28 pt-36 md:pt-44 pb-10 pb-16 md:pb-20 flex flex-col justify-between max-w-6xl mx-auto relative px-4 sm:px-6'>
        <div className='flex flex-col gap-3 sm:gap-4'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide text-white text-outline font-medium leading-tight sm:leading-snug md:leading-12 lg:leading-18'>
            {headingLines.map((line, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br className='hidden sm:block' />}
                {line}
              </React.Fragment>
            ))}
          </h1>
          <p className='text-white text-sm sm:text-base md:text-lg tracking-wide max-w-xl'>
            {subheading}
          </p>
        </div>
        <div className='flex flex-col gap-2 mt-6 sm:mt-0'>
          <div className='flex items-center gap-2 flex-wrap'>
            {tags.slice(0, 2).map((tag) => (
              <div key={tag} className='border border-white/80 px-3 py-1 rounded-2xl sm:px-4'>
                <span className='text-white text-xs sm:text-sm tracking-wider'>{tag}</span>
              </div>
            ))}
          </div>
          <div className='flex items-center gap-2 flex-wrap'>
            {tags.slice(2, 4).map((tag) => (
              <div key={tag} className='border border-white/80 px-3 py-1 rounded-2xl sm:px-4'>
                <span className='text-white text-xs sm:text-sm tracking-wider'>{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero
