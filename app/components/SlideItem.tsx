import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { Loader2Icon, ShoppingCart } from "lucide-react";
import { configuredSanityClient } from "../lib/utils";
import { useOrderStore } from "@/state/OrdetState";
import { useCartStore } from "@/state/CartState";
import { useAuth, useClerk } from "@clerk/nextjs";
import Link from "next/link";
interface IProps {
  id: string;
  image: string;
  name: string;
  price: number;
  stripeProductId: string;
  slug: {
    current: string;
  };
  categories: [
    {
      title: string;
    }
  ];
}
const truncate = (text: string) => {
  let length = 15;
  if (text.length > length) {
    return `${text.slice(0, length)}...`;
  }
  return text;
};
export default function SlideItem(props: IProps) {
  const { image, name, price, categories, stripeProductId, id, slug } = props;
  const { loading, buyOrder, priceId } = useOrderStore();
  const { addToCart } = useCartStore();
  const { userId } = useAuth();
  const clerk = useClerk();
  const imageProps = useNextSanityImage(configuredSanityClient, image);
  return (
    <div className="focus:border-none mx-1 lg:mx-10 relative bg-slate-50 lg:p-2 rounded-md">
      <span className="absolute top-0 right-0 bg-slate-100-400 text-[8px] border border-slate-300 p-1">
        {categories[0]?.title}
      </span>
      <Link href={`/product/${slug.current}`}>
        <Image
          {...imageProps}
          style={{ width: "100%", height: "20rem", objectFit: "contain" }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={name}
        />
      </Link>
      <Link href={`/product/${slug.current}`} className="font-semibold text-xl">
        {truncate(name)}
      </Link>
      <div className="flex justify-between items-center">
        <p className="font-semibold">${price}</p>
        <div className="flex items-center justify-center gap-1">
          <button
            onClick={() => {
              if (!userId) {
                clerk.openSignIn();
                return;
              }
              addToCart({
                productId: id,
                price: price,
                quantity: 1,
                userId: userId as string,
                stripeProductId: stripeProductId,
              });
            }}
            className="bg-slate-100 border border-slate-300 p-1"
          >
            <ShoppingCart />
          </button>
          <button
            disabled={loading}
            onClick={() => {
              if (!userId) {
                clerk.openSignIn();
                return;
              }
              buyOrder([{ price: stripeProductId, quantity: 1 }], userId);
            }}
            className="bg-slate-100 border border-slate-300 p-2 font-bold text-xs"
          >
            {priceId === stripeProductId && loading ? (
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
