import Image from "next/image";
import SectionHeading from "./commons/SectionHeading";

export default function Events() {
  return (
    <div className="flex justify-center flex-col mt-10 space-y-3 mb-20">
      <SectionHeading content="Our Promotions Events" heading="Promotions" />

      <div className="flex gap-8 h-full flex-wrap md:flex-nowrap">
        <div className="w-full flex-col h-full lg:w-3/4">
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
  );
}
