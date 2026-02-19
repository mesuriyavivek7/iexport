import React from 'react'
import { categories } from '@/data/category'
import CategoryCard from '@/components/website/category-card'

type Props = {}

const Products = (props: Props) => {
  return (
    <div>
      {/* Header Part */}
      <div className='relative pt-28 sm:pt-36 pb-10 sm:pb-16'>
        <section className='relative z-40 mx-auto max-w-6xl px-4 sm:px-6'>
          <div className='flex flex-col items-center gap-3 sm:gap-4'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold leading-tight sm:leading-10 md:leading-12 text-center'>
              <span className='text-white'>Quality products for </span>
              {/* <br className='hidden md:block' /> */}
              <span className='text-white'>global trade</span>
            </h1>
            <p className='text-center text-sm sm:text-base text-white leading-6 sm:leading-7 max-w-3xl'>
              We supply premium-grade sand and seeds with consistent quality, reliable packaging, and export-ready standards.
            </p>
          </div>
        </section>
        <div className="absolute z-40 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" aria-hidden />
        <div className='absolute z-10 inset-0 bg-(--color-primary-blue)' aria-hidden />
      </div>

      <section className='mx-auto max-w-6xl px-6 py-12 md:px-8 md:py-20'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch gap-4 sm:gap-6'>
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Products