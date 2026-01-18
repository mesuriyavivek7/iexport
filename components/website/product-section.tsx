import React from 'react'
import ProductSlider from './product-slider'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'

type Props = {}

const Products = (props: Props) => {
  return (
    <div className='px-8 bg-[#ebf4fa] py-20'>
        <section className='mx-auto  max-w-6xl flex flex-col gap-4'>
             <h1 className='text-4xl text-center font-bold'>
                <span className='text-[#082f49]'>Crafted by Nature, </span> 
                <span className='text-[#B91C1C]'>Delivered with Care</span>
             </h1>
             <hr></hr>
             <h4 className='text-lg text-center text-[#333333]'>
                 Experience the finest products, sourced responsibly and delivered with uncompromising quality.
             </h4>
             <ProductSlider></ProductSlider>
             <div className='flex justify-center items-center'>
            <Link href={'/about'}>
             <Button size={"lg"} className='w-48 group bg-[#082f49] hover:bg-[#0b4a6f]  font-bold cursor-pointer '>
                View All Products
                <ChevronRight className='group-hover:translate-x-2 transition-all duration-300'></ChevronRight>
             </Button>
             </Link>
      </div>
        </section>
    </div>
  )
}

export default Products