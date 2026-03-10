import React from 'react'
import Countup from './countup'

export interface ShowCaseProps {
  data?: { count: string; title: string }[]
}

const defaultStats = [
  { count: '4', title: 'Years of Experience' },
  { count: '85', title: 'Consignment Done' },
  { count: '120', title: 'Happy Buyers' },
]

function parseCount(s: string): number {
  const n = parseInt(s.replace(/\D/g, ''), 10)
  return Number.isFinite(n) ? n : 0
}

const ShowCase = ({ data }: ShowCaseProps) => {
  const stats = Array.isArray(data) && data.length >= 3 ? data.slice(0, 3) : defaultStats

  return (
    <div className='relative px-6 py-12 md:px-8 md:py-20'>
      <div
        className='absolute z-10 inset-0 bg-cover bg-center bg-no-repeat bg-fixed'
        style={{ backgroundImage: "url('/assets/showcase.jpg')" }}
        aria-hidden
      />
      <div className='bg-black/50 absolute inset-0 z-20' aria-hidden />

      <section className='relative z-30 mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 items-stretch gap-12 lg:gap-16'>
        {stats.map((stat, i) => (
          <div key={i} className='flex flex-col gap-3 sm:gap-4'>
            <div className='p-6 sm:p-8 rounded-sm bg-[#082f49]/70 flex justify-center items-center min-h-[100px] sm:min-h-[120px]'>
              <Countup end={parseCount(stat.count)} />
            </div>
            <h4 className='text-center font-medium text-base sm:text-lg text-white'>{stat.title}</h4>
          </div>
        ))}
      </section>
    </div>
  )
}

export default ShowCase
