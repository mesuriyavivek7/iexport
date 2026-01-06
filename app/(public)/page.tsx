import Image from "next/image";
import HomeCarousle from "@/components/website/home-carousle";

export default function Home() {
  return (
    <div>
       <div className="w-screen h-screen">
        <HomeCarousle></HomeCarousle>
       </div>
    </div>
  );
}
