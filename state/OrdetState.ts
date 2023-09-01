import { buyOrder } from "@/lib/crud";
import { create } from "zustand";

interface IOrderData {
  price: string;
  quantity: number;
}

interface IOrder {
  loading: boolean;
  error: string | null;
  priceId: string;
  buyOrder: (data: IOrderData[], userId: string) => void;
}

export const useOrderStore = create<IOrder>((set) => ({
  loading: false,
  error: null,
  priceId: "",
  buyOrder: async (data: IOrderData[], userId: string) => {
    set({ loading: true, priceId: data[0].price });
    await buyOrder(data, userId);
    set({ loading: false, priceId: "" });
  },
}));
