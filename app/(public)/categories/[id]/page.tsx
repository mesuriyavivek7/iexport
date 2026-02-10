import React from 'react'
import { productSlides } from '@/data/productSlides'
import { categories } from '@/data/category'
import ProductSlideCard from '@/components/website/product-slide-card'
import { notFound } from 'next/navigation'

type Props = {
  params: {
    id: string
  }
}

const CategoryPage = ({ params }: Props) => {
  const categoryId = parseInt(params.id)
  
  // Find the category by id
  const category = categories.find(cat => cat.id === categoryId)
  
  // If category not found, show 404
  if (!category) {
    notFound()
  }
  
  // Filter products by category id
  const categoryProducts = productSlides.filter(product => product.category === categoryId)
  
  return (
    <div>
      {/* Header Part */}
      <div className='relative pt-36 pb-16'>
        <section className='mx-auto z-40 relative max-w-6xl'>
          <div className='flex flex-col items-center gap-4'>
            <h1 className='text-5xl leading-12 font-bold'>
              <span className='text-white'>{category.title}</span>
            </h1>
            <p className='text-center w-3xl text-[16px] text-white leading-7'>
              Explore our premium {category.title.toLowerCase()} products with consistent quality, reliable packaging, and export-ready standards.
            </p>
          </div>
        </section>
        <div className="absolute z-40 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        <div className='absolute z-10 inset-0 bg-(--color-primary-blue)'></div>
      </div>

      {/* Products Section */}
      <section className='mx-auto max-w-6xl py-16'>
        {categoryProducts.length > 0 ? (
          <div className='grid grid-cols-4 items-stretch gap-6'>
            {categoryProducts.map((product) => (
              <ProductSlideCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className='text-center py-16'>
            <p className='text-lg text-gray-600'>No products found in this category.</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default CategoryPage

