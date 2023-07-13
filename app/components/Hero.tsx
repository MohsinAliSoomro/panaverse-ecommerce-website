import { ShoppingCart } from "lucide-react";
import Image from "next/image";
export default function Hero() {
  return (
    <div className="flex items-center justify-between flex-wrap-reverse">
      <div className="flex items-start flex-col space-y-6 w-full lg:w-1/2 ">
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
      <div className="w-full lg:w-1/2">
        <div className="bg-[#FFECE3] mx-auto w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] rounded-full relative">
          <Image
            src="/girl.webp"
            alt="product"
            width={500}
            height={500}
            className=" object-cover w-[300px] h-[300px] lg:w-[650px] lg:h-[650px] absolute -top-5 left-14"
          />
        </div>
      </div>
    </div>
  );
}
