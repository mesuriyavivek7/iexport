import Hero from "@/components/website/hero"
import About from "@/components/website/about"
import Products from "@/components/website/product-section"
import ShowCase from "@/components/website/showcase-section"
import Transaport from "@/components/website/transport-section"
import Contact from "@/components/website/contact-section"
import CertificateSlider from "@/components/website/certificate-slider"
import { fetchHomePageData } from "@/lib/home-data"

export default async function Home() {
  const data = await fetchHomePageData()

  return (
    <div>
      <Hero data={data.hero} />
      <About data={data.aboutHome} />
      <Products data={data.categorySection} categories={data.categories} />
      <ShowCase data={data.stats} />
      <Transaport data={data.showcase} />
      <Contact />
      <CertificateSlider certificates={data.certificates} />
    </div>
  )
}
