"use client";
import { useCartStore } from "@/state/CartState";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import Link from "next/link";
const CartItem = dynamic(() => import("./CartItem"), {
  loading: () => <div>Loading...</div>,
});

interface IProps {}
export default function CartItems({}: IProps) {
  const { carts, fetchCartItems, cartItemProducts, removeToCart } =
    useCartStore();

  useEffect(() => {
    if (Array.isArray(carts) && carts?.length && !cartItemProducts.length) {
      fetchCartItems(carts.map((i) => i.productId));
    }
  }, [carts]);

  const handleRemoveCart = (data: any) => {
    const product = carts.find((i) => i.productId === data._id);
    removeToCart(product?.id as number);
  };

  return (
    <div className="rounded-lg border shadow p-3 z-50 bg-white/40 backdrop-blur">
      <h1 className="text-center w-full font-bold text-lg my-2">Cart Items</h1>
      {Array.isArray(cartItemProducts) &&
        cartItemProducts
          .slice(0, 3)
          .map((item, idx) => (
            <CartItem
              item={item}
              key={idx}
              removeToCart={() => handleRemoveCart(item)}
            />
          ))}

      <Link
        href={"/user/cart"}
        className="flex items-center justify-center border-t"
      >
        View All
      </Link>
    </div>
  );
}
