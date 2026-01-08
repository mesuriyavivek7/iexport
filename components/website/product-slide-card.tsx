import React from 'react'
import { product } from '@/data/productSlides'
import Image from 'next/image'
import { Button } from '../ui/button'

type Props = {}

const ProductSlideCard = ({product}: {product:product}) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
      <div className="relative h-40 w-full mb-4">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <h3 className="font-semibold text-lg">{product.title}</h3>

      <Button size={"lg"} className='mt-4 cursor-pointer w-full bg-[#082f49] hover:bg-[#0b4a6f] text-white py-2 rounded-lg'>
         View Product
      </Button>
    </div>
  )
}

export default ProductSlideCard