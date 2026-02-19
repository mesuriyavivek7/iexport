import React from 'react'
import Countup from './countup'

type Props = {}

const ShowCase = (props: Props) => {
  return (
    <div className='relative px-6 py-12 md:px-8 md:py-20'>
      <div
        className='absolute z-10 inset-0 bg-cover bg-center bg-no-repeat bg-fixed'
        style={{ backgroundImage: "url('/assets/showcase.jpg')" }}
        aria-hidden
      />
      <div className='bg-black/50 absolute inset-0 z-20' aria-hidden />

      <section className='relative z-30 mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 items-stretch gap-12 lg:gap-16'>
        <div className='flex flex-col gap-3 sm:gap-4'>
          <div className='p-6 sm:p-8 rounded-sm bg-[#082f49]/70 flex justify-center items-center min-h-[100px] sm:min-h-[120px]'>
            <Countup end={4} />
          </div>
          <h4 className='text-center font-medium text-base sm:text-lg text-white'>Years of Experience</h4>
        </div>
        <div className='flex flex-col gap-3 sm:gap-4'>
          <div className='p-6 sm:p-8 rounded-sm bg-[#082f49]/70 flex justify-center items-center min-h-[100px] sm:min-h-[120px]'>
            <Countup end={85} />
          </div>
          <h4 className='text-center font-medium text-base sm:text-lg text-white'>Consignment Done</h4>
        </div>
        <div className='flex flex-col gap-3 sm:gap-4 sm:col-span-2 lg:col-span-1'>
          <div className='p-6 sm:p-8 rounded-sm bg-[#082f49]/70 flex justify-center items-center min-h-[100px] sm:min-h-[120px]'>
            <Countup end={120} />
          </div>
          <h4 className='text-center font-medium text-base sm:text-lg text-white'>Happy Buyers</h4>
        </div>
      </section>
    </div>
  )
}

export default ShowCase