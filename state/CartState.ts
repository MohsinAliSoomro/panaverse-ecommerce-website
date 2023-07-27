import { create } from "zustand";
import { addToCartAPI, removeToCartAPI, fetchUserCartAPI } from "../lib/crud";

interface IProduct {
  id?: number;
  productId: string;
  userId: string;
  price: number;
  quantity: number;
}

interface ICart {
  carts: IProduct[];
  cartItems: number;
  addToCart: (data: IProduct) => void;
  removeToCart: (id: string) => void;
  fetchCart: () => void;
}

export const useCartStore = create<ICart>((set) => ({
  carts: [],
  cartItems: 0,
  fetchCart: async () => {
    const response = await fetchUserCartAPI();
    console.log("fetchCart", { response });
    set({ cartItems: response.length, carts: response });
  },
  addToCart: async (data: IProduct) => {
    console.log("addToCart", { data });
    const response = await addToCartAPI(data);
    console.log("addToCart", { response });
    set((state) => {
      const newItems = [...state.carts, ...response];
      return {
        carts: newItems,
        cartItems: newItems.length,
      };
    });
  },
  removeToCart: async (id: string) => {
    const response = await removeToCartAPI(id);
    set((state) => {
      const filterResult = state.carts.filter((s) => s.id !== response[0].id);
      return {
        cartItems: filterResult.length,
        carts: filterResult,
      };
    });
  },
}));
