import Hero from "@/components/website/hero";
import About from "@/components/website/about";
import Products from "@/components/website/product-section";
import ShowCase from "@/components/website/showcase-section";
import Transaport from "@/components/website/transport-section";
import Contact from "@/components/website/contact-section";
import CertificateSlider from "@/components/website/certificate-slider";

export default function Home() {
  return (
    <div>
        {/* <HomeCarousle></HomeCarousle> */}
         <Hero></Hero>
         <About></About>
         <Products></Products>
         <ShowCase></ShowCase>
         <Transaport></Transaport>
         <Contact></Contact>
        <CertificateSlider></CertificateSlider>
    </div>
  );
}
