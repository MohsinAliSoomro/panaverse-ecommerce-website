import Image from "next/image";
import { createClient } from "@sanity/client";
import { useNextSanityImage } from "next-sanity-image";
import { ShoppingCart } from "lucide-react";
const configuredSanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
});
interface IProps {
  image: string;
  name: string;
  price: string;
  categories: [
    {
      title: string;
    }
  ];
}
export default function SlideItem(props: IProps) {
  const { image, name, price, categories } = props;
  const imageProps = useNextSanityImage(configuredSanityClient, image);

  return (
    <div className="focus:border-none mx-10 relative bg-slate-50 p-2 rounded-md">
      <span className="absolute top-0 right-0 bg-slate-100-400 text-[8px] border border-slate-300 p-1">
        {categories[0]?.title}
      </span>
      <Image
        {...imageProps}
        style={{ width: "100%", height: "20rem", objectFit: "contain" }} // layout="responsive" prior to Next 13.0.0
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={name}
        //  placeholder="blur"
        //  blurDataURL={mySanityData.image.asset.metadata.lqip}
      />
      <p className="font-semibold text-xl">{name}</p>
      <div className="flex justify-between items-center">
        <p className="font-semibold">${price}</p>
        <div className="flex items-center justify-center gap-1">
          <button className="bg-slate-100 border border-slate-300 p-1">
            <ShoppingCart />
          </button>
          <button className="bg-slate-100 border border-slate-300 p-2 font-bold text-xs">Buy</button>
        </div>
      </div>
    </div>
  );
}
