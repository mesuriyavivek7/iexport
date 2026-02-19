import React from 'react'
import Image from 'next/image'

type Props = {}

const About = (props: Props) => {
  return (
    <div>
      {/* Header Section */}
      <div className='relative pt-28 sm:pt-36 pb-10 sm:pb-16'>
        <section className='relative z-40 mx-auto max-w-6xl px-4 sm:px-6'>
          <div className='flex flex-col items-center gap-3 sm:gap-4'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold leading-tight sm:leading-10 md:leading-12 text-center text-white'>
              About Procure Export
            </h1>
            <p className='text-center text-sm sm:text-base text-white leading-6 sm:leading-7 max-w-3xl'>
              We are a trusted import–export company committed to delivering high-quality products, transparent processes, and reliable global trade solutions.
            </p>
          </div>
        </section>
        <div className="absolute z-40 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" aria-hidden />
        <div className='absolute z-10 inset-0 bg-(--color-primary-blue)' aria-hidden />
      </div>

      <section className='mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-20'>
        <div className='grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-20'>
          <div className="relative w-full aspect-[4/3] lg:aspect-auto lg:min-h-[320px] overflow-hidden rounded-lg">
            <Image
              src="/assets/aboutpage.png"
              alt="About Procure Export"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className='flex flex-col gap-3 sm:gap-2'>
            <h2 className='md:text-base text-lg font-semibold leading-tight text-center md:text-left'>About Procure Export</h2>
            <p className='text-[#333333] text-center md:text-left text-sm sm:text-base leading-6 sm:leading-7'>
              Procure Export connects global buyers with premium agricultural products, spices, and food grains. We focus on smart sourcing, quality assurance, and efficient logistics to make global trade simple and reliable.
            </p>
            <p className='text-[#333333] text-sm sm:text-base text-center md:text-left leading-6 sm:leading-7'>
              Built on trust and transparency, we work closely with farmers, suppliers, and logistics partners to deliver products that meet international standards—on time, every time.
            </p>
          </div>
        </div>

        <div className='grid mt-24 lg:mt-32 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 items-stretch gap-16 md:gap-6'>
           <div className='relative rounded-2xl flex bg-[#f1f5f9] flex-col justify-center items-center p-6 sm:p-8 gap-2 sm:col-span-2 lg:col-span-1'>
              <div className='absolute bg-(--color-primary-blue-hover) md:p-2 p-1 rounded-full -top-10'>
                <Image src={'/assets/vision.png'} alt='Vision' height={60} width={60} />
              </div>
              <h2 className='text-primary text-lg font-semibold'>Vision</h2>
              <p className='text-center text-[#334155] text-sm sm:text-[15px] leading-6'>
                To redefine agricultural exports through innovation, quality, and global partnerships.
              </p>
           </div>
           <div className='relative rounded-2xl flex bg-[#f1f5f9] flex-col justify-center items-center p-6 sm:p-8 gap-2'>
             <div className='absolute bg-(--color-primary-blue-hover) md:p-2 p-1 rounded-full -top-10'>
               <Image src={'/assets/mission.png'} alt='Mission' height={60} width={60} />
             </div>
             <h2 className='text-primary text-lg font-semibold'>Mission</h2>
             <p className='text-center text-[#334155] text-sm sm:text-[15px] leading-6'>
               To provide reliable export solutions by sourcing the best products and delivering them efficiently to global markets.
             </p>
           </div>
           <div className='relative rounded-2xl flex bg-[#f1f5f9] flex-col justify-center items-center p-6 sm:p-8 gap-2 sm:col-span-2 lg:col-span-1'>
             <div className='absolute bg-(--color-primary-blue-hover) md:p-2 p-1 rounded-full -top-10'>
               <Image src={'/assets/ambition.png'} alt='Ambition' height={60} width={60} />
             </div>
             <h2 className='text-primary text-lg font-semibold'>Ambition</h2>
             <p className='text-center text-[#334155] text-sm sm:text-[15px] leading-6'>
               To rapidly expand our global export footprint, strengthen supplier networks, and position Procure Export as a preferred partner in international trade.
             </p>
           </div>
        </div>

        <div className='flex mt-16 sm:mt-24 lg:mt-32 flex-col gap-6 sm:gap-8'>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-bold text-primary text-center'>
            India-Based Manufacturer & Supplier
          </h2>
          {/* Company Details Section */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8'>
            {/* SHREE SWASTIK TRADING CO. */}
            <div className='rounded-2xl bg-[#f1f5f9] p-6 sm:p-8 flex flex-col gap-4'>
              <h2 className='text-xl sm:text-2xl font-bold text-primary'>SHREE SWASTIK TRADING CO.</h2>
              <div className='flex flex-col gap-3'>
                <h3 className='text-base sm:text-lg font-semibold text-[#334155]'>Wholesale Dealers In:</h3>
                <div className='flex flex-wrap gap-2'>
                  <span className='text-primary text-xs sm:text-sm p-2 bg-gray-50 rounded-2xl px-3 sm:px-4'>Jaggery</span>
                  <span className='text-primary text-xs sm:text-sm p-2 bg-gray-50 rounded-2xl px-3 sm:px-4'>Peanuts</span>
                  <span className='text-primary text-xs sm:text-sm p-2 bg-gray-50 rounded-2xl px-3 sm:px-4'>Grains</span>
                  <span className='text-primary text-xs sm:text-sm p-2 bg-gray-50 rounded-2xl px-3 sm:px-4'>Pulses</span>
                  <span className='text-primary text-xs sm:text-sm p-2 bg-gray-50 rounded-2xl px-3 sm:px-4'>Oilseeds</span>
                  <span className='text-primary text-xs sm:text-sm p-2 bg-gray-50 rounded-2xl px-3 sm:px-4'>Variyali (Sauf)</span>
                  <span className='text-primary text-xs sm:text-sm p-2 bg-gray-50 rounded-2xl px-3 sm:px-4'>Cumin Seed</span>
                </div>
              </div>
              <div className='mt-4 pt-4 border-t border-[#cbd5e1]'>
                <div className='flex items-start gap-2'>
                  <span className='text-primary font-semibold'>📍</span>
                  <div className='flex flex-col gap-1 min-w-0'>
                    <span className='text-[#334155] font-medium text-sm sm:text-[15px]'>Address:</span>
                    <p className='text-[#334155] text-sm sm:text-[15px] leading-6'>
                      Plot No. 28/1, APMC Market, Visnagar<br />
                      Dist. Mehsana, Gujarat
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* SARASWATI EARTHTEK QUARRY */}
            <div className='rounded-2xl bg-[#f1f5f9] p-6 sm:p-8 flex flex-col gap-4'>
              <h2 className='text-xl sm:text-2xl font-bold text-primary'>SARASWATI EARTHTEK QUARRY</h2>
              <div className='flex flex-col gap-3'>
                <h3 className='text-base sm:text-lg font-semibold text-[#334155]'>Aggregate Supplier</h3>
                <div className='flex flex-col gap-2'>
                  <p className='text-[#334155] text-sm sm:text-[15px] leading-6'>
                    Different MM and Grades Crushed Stone and M-Sand Supplier
                  </p>
                  <p className='text-[#334155] text-sm sm:text-[15px] leading-6'>
                    (3 mm, 6 mm, 9 mm, 12 mm, 20 mm, 30 mm, 60 mm, 90 mm etc.)
                  </p>
                </div>
              </div>
              <div className='mt-4 pt-4 border-t border-[#cbd5e1]'>
                <div className='flex items-start gap-2'>
                  <span className='text-primary font-semibold'>📍</span>
                  <div className='flex flex-col gap-1 min-w-0'>
                    <span className='text-[#334155] font-medium text-sm sm:text-[15px]'>Address:</span>
                    <p className='text-[#334155] text-sm sm:text-[15px] leading-6'>
                      Samara pur, Satalasana, Dist. Mahesana, Gujarat
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
  )
}

export default About