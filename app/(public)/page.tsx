import Image from "next/image";
import HomeCarousle from "@/components/website/home-carousle";
import About from "@/components/website/about";
import Products from "@/components/website/product-section";
import ShowCase from "@/components/website/showcase-section";
import Transaport from "@/components/website/transport-section";

export default function Home() {
  return (
    <div>
        <HomeCarousle></HomeCarousle>
        <About></About>
        <Products></Products>
        <ShowCase></ShowCase>
        <Transaport></Transaport>
    </div>
  );
}
