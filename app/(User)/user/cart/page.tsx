"use client";
import CartPageItem from "@/app/components/CartPageItem";
import { useCartStore } from "@/state/CartState";
import { useOrderStore } from "@/state/OrdetState";
import { useAuth, useClerk } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";

export default function Page() {
  const { cartItemProducts, carts, removeToCart, shipping, total } =
    useCartStore();
  const { buyOrder, loading } = useOrderStore();
  const auth = useAuth();
  const clerk = useClerk();
  const handleRemoveCart = (data: any) => {
    const product = carts.find((i) => i.productId === data._id);
    removeToCart(product?.id as number);
  };

  return (
    <div className="bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {Array(cartItemProducts) &&
            cartItemProducts.map((item, idx) => (
              <CartPageItem
                item={item}
                key={idx}
                removeToCart={() => handleRemoveCart(item)}
              />
            ))}
        </div>
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${total}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">${shipping}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">${total + shipping} USD</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <button
            onClick={() => {
              if (!auth.userId) {
                clerk.openSignIn();
                return;
              }
              let response = cartItemProducts.map((item: any) => {
                return {
                  price: item.stripeProductId,
                  quantity: 1,
                };
              });
              buyOrder(response, auth.userId);
            }}
            className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 relative"
          >
            {loading ? (
              <span>
                <Loader2Icon size={16} className="animate-spin" />
                Check out
              </span>
            ) : (
              "Check out"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
