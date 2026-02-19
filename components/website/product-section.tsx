import React from 'react'
import ProductSlider from './product-slider'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'

type Props = {}

const Products = (props: Props) => {
  return (
    <div className='px-6 py-12 md:px-8 md:py-20 bg-[#ebf4fa]'>
      <section className='mx-auto max-w-6xl flex flex-col gap-4 sm:gap-5'>
        <h1 className='text-3xl md:text-4xl text-center font-bold leading-tight'>
          <span className='text-primary'>Crafted by Nature, </span>
          <br className='sm:hidden' />
          <span className='text-secondary'>Delivered with Care</span>
        </h1>
        <hr className='w-20 mx-auto border-primary/30' />
        <h4 className='text-sm sm:text-base md:text-lg text-center text-[#333333] max-w-2xl mx-auto px-1'>
          Experience the finest products, sourced responsibly and delivered with uncompromising quality.
        </h4>
        <ProductSlider />
        <div className='flex justify-center items-center pt-2'>
          <Link href={'/categories'} className='w-auto flex justify-center'>
            <Button size={'lg'} className='w-48 group btn-primary font-bold cursor-pointer'>
              View All Products
              <ChevronRight className='group-hover:translate-x-2 transition-all duration-300' />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Products