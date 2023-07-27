"use client";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import { configuredSanityClient } from "../lib/utils";
import { ShoppingCart } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { useCartStore } from "../../state/CartState";
interface IProps {
  item: any;
}
export default function Product({ item }: IProps) {
  const { addToCart,carts } = useCartStore();
  console.log({carts})
  const { userId } = useAuth();
  const imageProps = useNextSanityImage(configuredSanityClient, item.mainImage);
  return (
    <div className="focus:border-none mx-10 relative bg-slate-50 p-2 rounded-md">
      <span className="absolute top-0 right-0 bg-slate-100-400 text-[8px] border border-slate-300 p-1">
        {item.categories[0]?.title}
      </span>
      <Image
        {...imageProps}
        style={{
          width: "100%",
          height: "20rem",
          objectFit: "contain",
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={item.title}
        //  placeholder="blur"
        //  blurDataURL={mySanityData.image.asset.metadata.lqip}
      />
      <p className="font-semibold text-xl">{item.title}</p>
      <div className="flex justify-between items-center">
        <p className="font-semibold">${item.price}</p>
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() =>
              addToCart({
                productId: item._id,
                price: item.price,
                quantity: 1,
                userId: userId as string,
              })
            }
            className="bg-slate-100 border border-slate-300 p-1"
          >
            <ShoppingCart />
          </button>
          <button className="bg-slate-100 border border-slate-300 p-2 font-bold text-xs">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
}
