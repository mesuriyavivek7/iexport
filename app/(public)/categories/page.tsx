import React from 'react'
import { products } from '@/data/products'
import { categories, category } from '@/data/category'
import ProductSlideCard from '@/components/website/product-slide-card'
import CategoryCard from '@/components/website/category-card'

type Props = {}

const Products = (props: Props) => {
  return (
    <div>
      {/* Header Part */}
       <div className='relative pt-36 pb-16'>
          <section className='mx-auto z-40 relative max-w-6xl'>
            <div className='flex flex-col items-center gap-4'>
               {/* <span className='text-lg text-[#9b9b9b] font-medium'>CONTACT US</span> */}
               <h1 className='text-5xl leading-12 font-bold'>
                  <span className='text-white'>Quality products for </span>
                  <span className='text-white'>global trade</span>
               </h1>
               <p className='text-center w-3xl text-[16px] text-white leading-7'>We supply premium-grade sand and seeds with consistent quality, reliable packaging, and export-ready standards.</p>
             </div>
          </section>
          <div className="absolute z-40 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

          <div className='absolute z-10 inset-0 bg-(--color-primary-blue)'></div>
        </div>

        <section className='mx-auto max-w-6xl py-16'>
             <div className='grid  grid-cols-4 items-stretch gap-6'>
                {
                    categories.map((category) => (
                          <CategoryCard key={category.id} category={category} />
                      ))
                }
             </div>
        </section>
  
    </div>
  )
}

export default Products