import React from 'react'
import { products } from '@/data/products'
import ProductSlideCard from '@/components/website/product-slide-card'

type Props = {}

const Products = (props: Props) => {
  return (
    <div className='px-8 py-16'>
        <section className='mx-auto max-w-6xl'>
             <div className='flex flex-col items-center gap-4'>
               <span className='text-lg text-[#9b9b9b] font-medium'>OUR PRODUCTS</span>
               <h1 className='text-5xl leading-12 font-bold'>
                  <span className='text-[#082f49]'>Quality products for  </span>
                  <span className='text-[#B91C1C]'>global trade</span>
               </h1>
               <p className='text-center w-3xl text-[16px] text-[#333333] leading-7'>We supply premium-grade sand and seeds with consistent quality, reliable packaging, and export-ready standards.</p>
             </div>
             <div className='grid mt-16 grid-cols-4 items-stretch gap-6'>
                {
                    products.map((product) => (
                          <ProductSlideCard key={product.id} product={product} />
                      ))
                }
             </div>
        </section>
    </div>
  )
}

export default Products