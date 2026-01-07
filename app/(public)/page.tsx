import Image from "next/image";
import HomeCarousle from "@/components/website/home-carousle";
import About from "@/components/website/about";

export default function Home() {
  return (
    <div>
        <HomeCarousle></HomeCarousle>
        <About></About>
    </div>
  );
}
