"use client";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import { configuredSanityClient } from "../lib/utils";
import { Loader2Icon, ShoppingCart } from "lucide-react";
import { useAuth, useClerk } from "@clerk/nextjs";
import { useCartStore } from "../../state/CartState";
import { useOrderStore } from "@/state/OrdetState";
interface IProps {
  item: any;
}
export default function Product({ item }: IProps) {
  const { addToCart } = useCartStore();
  const { loading, buyOrder, priceId } = useOrderStore();
  const { userId } = useAuth();
  const imageProps = useNextSanityImage(configuredSanityClient, item.mainImage);
  const clerk = useClerk();
  return (
    <div className="focus:border-none mx-10 relative bg-slate-50 p-2 rounded-md">
      <span className="absolute top-0 right-0 bg-slate-100-400 text-[8px] border border-slate-300 p-1">
        {item.categories[0]?.title}
      </span>
      <Image
        {...(imageProps as any)}
        style={{
          width: "100%",
          height: "20rem",
          objectFit: "contain",
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        alt={item.title}
      />
      <p className="font-semibold text-xl">{item.title}</p>
      <div className="flex justify-between items-center">
        <p className="font-semibold">${item.price}</p>
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => {
              if (!userId) {
                clerk.openSignIn();
                return;
              }
              addToCart({
                productId: item._id,
                price: item.price,
                quantity: 1,
                userId: userId as string,
                stripeProductId: item.stripeProductId,
              });
            }}
            className="bg-slate-100 border border-slate-300 p-1"
          >
            <ShoppingCart />
          </button>
          <button
            onClick={() => {
              if (!userId) {
                clerk.openSignIn();
                return;
              }
              buyOrder([{ price: item.stripeProductId, quantity: 1 }]);
            }}
            className="bg-slate-100 border border-slate-300 p-2 font-bold text-xs"
          >
            {priceId === item.stripeProductId && loading ? (
              <Loader2Icon size={16} className="animate-spin" />
            ) : (
              "Buy"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
