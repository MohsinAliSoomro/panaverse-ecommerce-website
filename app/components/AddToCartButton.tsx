"use client"
import { useCartStore } from "@/state/CartState";
import { useAuth, useClerk } from "@clerk/nextjs";

interface IProps {
  className: string;
  item: {
    _id: string;
    price: number;
    stripeProductId: string;
  };
  text?: string;
}
export default function AddToCart({
  className,
  item,
  text = "Add to Cart",
}: IProps) {
  const clerk = useClerk();
  const { userId } = useAuth();
  const { addToCart } = useCartStore();
  return (
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
      className={className}
    >
      {text}
    </button>
  );
}
