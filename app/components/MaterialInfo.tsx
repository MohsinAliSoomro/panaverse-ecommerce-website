import Image from "next/image";
import MaterialInfoItem from "./commons/MaterialInfoItem";

export default function MaterialInfo() {
  const MATERIAL_INFO_DATA = [
    {
      title: "Using Good Quality Materials",
      content: "Lorem ipsum dolor sit amt, consectetur adipiscing elit",
    },
    {
      title: "100% Handmade Products",
      content: "Lorem ipsum dolor sit amt, consectetur adipiscing elit",
    },
    {
      title: "Modern Fashion Design",
      content: "Lorem ipsum dolor sit amt, consectetur adipiscing elit",
    },
    {
      title: "Discount for Bulk Orders",
      content: "Lorem ipsum dolor sit amt, consectetur adipiscing elit",
    },
  ];
  return (
    <div className="flex flex-col py-20 relative">
      <div className="absolute inset-0 bg-[#FBFCFF]"></div>
      <div className="flex relative">
        <div className="lg:w-1/2"></div>
        <h1 className="lg:absolute lg:-top-28 lg:-right-20 text-4xl font-bold flex w-full lg:w-1/2 justify-end mb-10 lg:mb-0">
          Unique and Authentic Vintage Designer Jewellery
        </h1>
      </div>
      <div className="flex justify-center items-center relative flex-wrap lg:flex-nowrap gap-4">
        <div className="absolute top-0 left-0 text-8xl w-1/4 font-bold opacity-10 -z-0">
          Different From Others
        </div>
        <div className="w-full lg:w-1/2">
          <div className="grid grid-cols-2 grid-flow-row gap-2 lg:gap-12">
            {MATERIAL_INFO_DATA.map((item) => (
              <MaterialInfoItem
                content={item.content}
                title={item.title}
                key={item.title}
              />
            ))}
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center items-center flex-wrap lg:flex-nowrap gap-4">
          <Image
            src="/girl4.png"
            alt="girl"
            width={200}
            height={200}
            className="w-full h-60"
          />
          <div>
            <p className="text-sm">
              This piece is ethically crafted in our small family-owned workshop
              in Peru with unmatched attention to detail and care. The Natural
              color is the actual natural color of the fiber, undyed and 100%
              traceable.
            </p>
            <button className="bg-black text-white px-20 py-2 mt-4 text-sm">
              See All Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
