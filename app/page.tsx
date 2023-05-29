import Image from "next/image";
import { ShoppingCart } from "lucide-react";

const PRODUCT_DATA = [
  {
    name: "Brushed Raglan Sweatshirt",
    image: "",
    price: "$195",
  },
  {
    name: "Brushed Raglan Sweatshirt",
    image: "",
    price: "$195",
  },
  {
    name: "Brushed Raglan Sweatshirt",
    image: "",
    price: "$195",
  },
  {
    name: "Brushed Raglan Sweatshirt",
    image: "",
    price: "$195",
  },
  {
    name: "Brushed Raglan Sweatshirt",
    image: "",
    price: "$195",
  },
  {
    name: "Brushed Raglan Sweatshirt",
    image: "",
    price: "$195",
  },
];
export default function Home() {
  return (
    <main className="container mx-auto ">
      <div className="flex items-center justify-between flex-wrap-reverse">
        <div className="flex items-start flex-col space-y-6 w-full lg:w-1/2 ">
          <span className="bg-blue-600/10 p-2 rounded-lg text-blue-800 px-4 font-bold">
            Sale 70%
          </span>
          <h1 className="text-5xl font-bold">
            An Industrial Take on Streetwear
          </h1>
          <p>
            Anyone can beat you but no one can beat your <br /> outfit as long
            as you wear Dine outfits.
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
      <div className="flex justify-center flex-col mt-10 space-y-3 mb-20">
        <p className="text-blue-600 text-center">Promotions</p>
        <h1 className="text-3xl font-bold text-center">
          Our Promotions Events
        </h1>
        <div className="flex gap-8 h-full flex-wrap md:flex-nowrap">
          <div className="w-full lg:w-1/2 h-auto">
            <div className="bg-[#D6D6D8] flex rounded-lg py-6 lg:p-0">
              <div className="w-full lg:w-1/2 justify-center flex items-start ml-8 flex-col">
                <h1 className="font-bold text-4xl">GET UP TO 60%</h1>
                <p className="">For the summer season</p>
              </div>
              <div className="">
                <Image
                  src="/cloth1.png"
                  alt="cloth"
                  width={140}
                  height={140}
                  className="w-full"
                />
              </div>
            </div>
            <div className="bg-black text-white flex flex-col space-y-4 items-center p-8 rounded-lg mt-4 h-auto ">
              <h1 className="font-bold text-3xl text-white">GET 30% Off</h1>
              <p className="text-xs">USE PROMO CODE</p>
              <button className="bg-[#474747] rounded-lg px-8 py-2">
                DINEWEEKENDSALE
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex flex-wrap md:flex-nowrap gap-6">
            <div className="bg-[#EFE1C1] w-full rounded-lg px-4 pt-4">
              <p>Flex Sweatshirt</p>
              <p>
                <del>$100.00</del>{" "}
                <span className="font-bold text-lg">$75.00</span>
              </p>
              <Image
                src="/cloth2.png"
                alt="cloth2"
                width={200}
                height={200}
                className="w-full mt-2"
              />
            </div>
            <div className="bg-[#D7D7D9] w-full rounded-lg px-4 pt-4">
              <p>Flex Push Button Bomber</p>
              <p>
                <del>$225.00</del>{" "}
                <span className="font-bold text-lg"> $190.00</span>
              </p>
              <Image
                src="/cloth3.png"
                alt="cloth3"
                width={200}
                height={200}
                className="w-full "
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center flex-col mt-10 space-y-3 mb-20">
        <p className="text-blue-600 text-center">PRODUCTS</p>
        <h1 className="text-3xl font-bold text-center">Check What We Have</h1>
        <div className="flex gap-8 h-full"></div>
      </div>
    </main>
  );
}
