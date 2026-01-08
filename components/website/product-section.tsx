import React from 'react'
import ProductSlider from './product-slider'

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
        </section>
    </div>
  )
}

export default Products