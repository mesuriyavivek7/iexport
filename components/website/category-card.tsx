import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export interface CategoryCardItem {
  id: string | number
  title: string
  image: string
}

const CategoryCard = ({ category }: { category: CategoryCardItem }) => {
  return (
    <Link href={`/categories/${category.id}`}>
      <div className="bg-white overflow-hidden relative cursor-pointer rounded-xl shadow border hover:shadow-xl duration-300 transition p-4">
     <div className="relative z-20 h-40 w-full mb-4">
      <Image
        src={category.image}
        alt={category.title}
        fill
        className="object-cover rounded-lg"
        unoptimized={category.image.startsWith('http')}
      />
     </div>

    <h3 className="font-semibold z-20 text-center text-lg">{category.title}</h3>

    {/* <Button size={"lg"} className='mt-4 cursor-pointer w-full bg-[#082f49] hover:bg-[#0b4a6f] text-white py-2 rounded-lg'>
       View Product
    </Button> */}

    <div className='absolute z-10'></div>

      </div>
    </Link>
  )
}

export default CategoryCard