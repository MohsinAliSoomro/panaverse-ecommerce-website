import { create } from "zustand";
import { addToCartAPI, removeToCartAPI, fetchUserCartAPI } from "../lib/crud";
import { SANITY_CONFIG } from "@/lib/sanityConfig";
import { createClient } from "next-sanity";
const client = createClient(SANITY_CONFIG);
interface IProduct {
  id?: number;
  productId: string;
  userId: string;
  price: number;
  quantity: number;
}

interface ICart {
  carts: IProduct[];
  cartItemProducts: [];
  cartItems: number;
  addToCart: (data: IProduct) => void;
  removeToCart: (id: number) => void;
  fetchCart: () => void;
  fetchCartItems: (idx: string[]) => void;
}

export const useCartStore = create<ICart>((set) => ({
  carts: [],
  cartItems: 0,
  cartItemProducts: [],
  fetchCartItems: async (idx) => {
    let promises: any[] = [];
    idx.map((id) => {
      promises.push(
        client.fetch(
          `*[_type == "products" && _id == $id]{
            _id,
            title,
            price,
            slug,
            mainImage,
            categories[]->{title}
          }`,
          { id: id }
        )
      );
    });
    const response = await Promise.all(promises);
    response.map((item) => {
      set((state) => {
        return {
          cartItemProducts: [...state.cartItemProducts, ...item] as any,
        };
      });
    });
  },
  fetchCart: async () => {
    const response = await fetchUserCartAPI();
    set({ cartItems: response.length, carts: response });
  },
  addToCart: async (data: IProduct) => {
    const response = await addToCartAPI(data);
    set((state) => {
      const newItems = [...state.carts, ...response];
      return {
        carts: newItems,
        cartItems: newItems.length,
      };
    });
  },
  removeToCart: async (id: number) => {
    const response = await removeToCartAPI(id);
    set((state) => {
      const filterResult = state.carts.filter((s) => s.id !== response[0].id);
      const filterCartItems = state.cartItemProducts.filter(
        (i) => i._id !== response[0].productId
      );
      return {
        cartItems: filterResult.length,
        carts: filterResult,
        cartItemProducts: filterCartItems as any,
      };
    });
  },
}));
