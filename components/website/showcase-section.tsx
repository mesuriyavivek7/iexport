import React from 'react'
import Countup from './countup'
type Props = {}

const ShowCase = (props: Props) => {
  return (
    <div className='relative px-6 py-28'>
        <div className='absolute z-10 inset-0 bg-fixed bg-cover bg-center'
        style={{backgroundImage:"url('/assets/showcase.jpg')"}}/>

        <div className='bg-black/50 z-20 inset-0 absolute'></div>

        <section className='mx-auto relative z-30 max-w-6xl gap-16 grid grid-cols-3 items-stretch'>
            <div className='flex flex-col gap-4'>
              <div className='p-8 rounded-sm bg-[#082f49]/70 flex justify-center items-center'>
              <Countup end={4} />
              </div>
              <h4 className='text-center font-medium text-lg text-white '>Years of Experience</h4>
            </div>
            <div className='flex flex-col gap-4'>
              <div className='p-8 rounded-sm bg-[#082f49]/70 flex justify-center items-center'>
              <Countup end={85} />
              </div>
              <h4 className='text-center font-medium text-lg text-white '>Consignment Done</h4>
            </div>
            <div className='flex flex-col gap-4'>
              <div className='p-8 rounded-sm bg-[#082f49]/70 flex justify-center items-center'>
              <Countup end={120} />
              </div>
              <h4 className='text-center font-medium text-lg text-white '>Happy Buyers</h4>
            </div>
        </section>

    </div>
  )
}

export default ShowCase