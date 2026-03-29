"use client"

import React from "react"
import { notFound } from "next/navigation"
import ProductSlideCard from "@/components/website/product-slide-card"
import { useProductsByCategory, useCategories } from "@/hooks"
import { PublicPagePulse } from "@/components/website/public-page-pulse"

type Props = { categoryId: string }

export function CategoryDetailContent({ categoryId }: Props) {
  const { data: products = [], isPending: productsPending } =
    useProductsByCategory(categoryId)
  const { data: categories = [], isPending: categoriesPending } = useCategories()

  if (productsPending || categoriesPending) return <PublicPagePulse />

  const categoryFromList = categories.find((c) => c._id === categoryId)
  if (products.length === 0 && !categoryFromList) {
    notFound()
  }

  const categoryName =
    products.length > 0
      ? products[0].category.name
      : categoryFromList?.name ?? "Category"

  const list = products.map((p) => ({
    id: p._id,
    name: p.name,
    image: p.image,
  }))

  return (
    <div>
      <div className="relative pt-28 sm:pt-36 pb-10 sm:pb-16">
        <section className="relative z-40 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight sm:leading-10 md:leading-12 text-center text-white">
              {categoryName}
            </h1>
            <p className="text-center text-sm sm:text-base text-white leading-6 sm:leading-7 max-w-3xl">
              Explore our premium {categoryName.toLowerCase()} products with consistent
              quality, reliable packaging, and export-ready standards.
            </p>
          </div>
        </section>
        <div
          className="absolute z-40 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_24px] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
          aria-hidden
        />
        <div className="absolute z-10 inset-0 bg-(--color-primary-blue)" aria-hidden />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 md:py-16">
        {list.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch gap-4 sm:gap-6">
            {list.map((product) => (
              <ProductSlideCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <p className="text-base sm:text-lg text-gray-600">
              No products found in this category.
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
