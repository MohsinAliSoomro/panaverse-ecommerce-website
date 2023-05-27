import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Home() {
  return (
    <main className="container mx-auto flex items-center justify-between place-content-start">
      <div className="flex items-start flex-col space-y-6 w-1/2">
        <span className="bg-blue-600/10 p-2 rounded-lg text-blue-800 px-4 font-bold">
          Sale 70%
        </span>
        <h1 className="text-5xl font-bold">An Industrial Take on Streetwear</h1>
        <p>
          Anyone can beat you but no one can beat your <br /> outfit as long as
          you wear Dine outfits.
        </p>
        <button className="bg-black border px-8 py-4 text-white flex items-center justify-center space-x-3 font-bold">
          <ShoppingCart />
          <span> Start Shopping</span>
        </button>
      </div>
      <div className="w-1/2">
        <div className="bg-[#FFECE3] w-[600px] h-[600px] rounded-full relative">
          <Image
            src="/girl.webp"
            alt="product"
            width={500}
            height={500}
            className=" object-cover w-[650px h-[650px] absolute -top-5 left-14"
          />
        </div>
      </div>
    </main>
  );
}
