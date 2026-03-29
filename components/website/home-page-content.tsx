"use client"

import Hero from "@/components/website/hero"
import About from "@/components/website/about"
import Products from "@/components/website/product-section"
import ShowCase from "@/components/website/showcase-section"
import Transaport from "@/components/website/transport-section"
import Contact from "@/components/website/contact-section"
import CertificateSlider from "@/components/website/certificate-slider"
import { PublicPagePulse } from "@/components/website/public-page-pulse"
import {
  useHero,
  useAboutHome,
  useCategorySection,
  useCategories,
  useStats,
  useShowcase,
  useCertificates,
} from "@/hooks"

export function HomePageContent() {
  const hero = useHero()
  const aboutHome = useAboutHome()
  const categorySection = useCategorySection()
  const categories = useCategories()
  const stats = useStats()
  const showcase = useShowcase()
  const certificates = useCertificates()

  const loading =
    hero.isPending ||
    aboutHome.isPending ||
    categorySection.isPending ||
    categories.isPending ||
    stats.isPending ||
    showcase.isPending ||
    certificates.isPending

  if (loading) return <PublicPagePulse />

  return (
    <div>
      <Hero data={hero.data} />
      <About data={aboutHome.data} />
      <Products data={categorySection.data} categories={categories.data} />
      <ShowCase data={stats.data ?? undefined} />
      <Transaport data={showcase.data} />
      <Contact />
      <CertificateSlider certificates={certificates.data} />
    </div>
  )
}
