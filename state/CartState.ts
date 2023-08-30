import { create } from "zustand";
import { addToCartAPI, removeToCartAPI, fetchUserCartAPI } from "../lib/crud";
import { SANITY_CONFIG } from "@/lib/sanityConfig";
import { createClient } from "next-sanity";
import { toast } from "react-hot-toast";
const client = createClient(SANITY_CONFIG);
interface IProduct {
  id?: number;
  productId: string;
  userId: string;
  price: number;
  quantity: number;
  stripeProductId: string;
}

interface ICart {
  carts: IProduct[];
  cartItemProducts: [];
  cartItems: number;
  total: number;
  shipping: number;
  addToCart: (data: IProduct) => void;
  removeToCart: (id: number) => void;
  fetchCart: () => void;
  fetchCartItems: (idx: string[]) => void;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
  order: () => void;
  updateOrder: () => void;
}

export const useCartStore = create<ICart>((set) => ({
  carts: [],
  cartItems: 0,
  cartItemProducts: [],
  total: 0,
  shipping: 4.99,
  decrementQuantity() {},
  incrementQuantity() {},
  order() {},
  updateOrder() {},
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
            stripeProductId,
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
          total: sumPrices([...state.cartItemProducts, ...item]),
        };
      });
    });
  },
  fetchCart: async () => {
    const response = await fetchUserCartAPI();
    set({ cartItems: response?.length ?? 0, carts: response });
  },
  addToCart: async (data: IProduct) => {
    const response = await addToCartAPI(data);
    console.log({ response });
    if (!response) return;
    if (response?.exist) {
      toast("Product already exists in cart", {
        icon: "👍",
      });
      set((state) => {
        return {
          carts: state.carts,
        };
      });
      return;
    }
    set((state) => {
      let newItems = [...response];
      if (state.carts.length) {
        newItems = [...state.carts, ...response];
      }
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
        (i: { _id: string }) => i._id !== response[0].productId
      );
      return {
        cartItems: filterResult.length,
        carts: filterResult,
        cartItemProducts: filterCartItems as any,
      };
    });
  },
}));

function sumPrices(pricesArray: any[]) {
  let total = 0;
  for (let i = 0; i < pricesArray.length; i++) {
    total += pricesArray[i].price;
  }
  return total;
}
