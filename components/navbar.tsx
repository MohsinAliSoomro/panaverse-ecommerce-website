"use client";
import { Store, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { SignInButton, SignOutButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useId, useState } from "react";
import { useCartStore } from "@/state/CartState";
import CartItems from "@/app/components/CartItems";

const ROUTES = [
  {
    url: "/female",
    name: "Female",
  },
  {
    url: "/male",
    name: "Male",
  },
  {
    url: "/kids",
    name: "Kids",
  },
  {
    url: "/all-product",
    name: "All Product",
  },
];

export default function Navbar() {
  const { fetchCart, cartItems, carts } = useCartStore();
  const [search, setSearch] = useState("");
  const router = useRouter();
  const { userId } = useAuth();

  useEffect(() => {
    fetchCart();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search/${search}`);
  };
  return (
    <div className="container mx-auto flex justify-between items-center py-6 relative">
      <Link href={"/"} className="flex items-center space-x-2">
        <Store /> <span className="font-bold">Dino Market</span>
      </Link>
      <div>
        {ROUTES.map((item) => (
          <Link href={item.url} className="px-4">
            {item.name}
          </Link>
        ))}
      </div>
      <form onSubmit={handleSearchSubmit} className="relative">
        <Search
          size={14}
          className="absolute top-1 left-1 mt-[2px] text-gray-400"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          name="searchInput"
          placeholder="What you are looking for"
          className="px-5 border rounded-lg border-gray-300 text-sm focus:border-none active:border-none"
        />
      </form>
      <div className="flex items-center gap-3 group">
        <Link
          href={"/user/cart"}
          className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center flex relative"
        >
          <span className="absolute top-0 right-0 bg-orange-700 text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center">
            {cartItems}
          </span>
          <ShoppingCart size={20} className="" />
        </Link>
        <div className="hidden group-hover:block absolute top-14 right-24 w-96 z-50">
          <CartItems />
        </div>
        {userId ? <SignOutButton /> : <SignInButton />}
      </div>
      {/* <div className="hidden group-hover:block absolute top-10 right-5 z-10 inset-0">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h2 className="text-2xl font-bold mb-4">My Modal Content</h2>
              <p>This is the content inside the modal.</p>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div> */}
      {/* {isHover && <CartItems setIsHover={setIsHover}  />} */}
    </div>
  );
}
