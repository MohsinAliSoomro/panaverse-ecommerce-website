import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);
// Create a pgTable that maps to a table in your DB

export const OrderTable = pgTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    userId: text("userId").notNull(),
    itemCount: integer("quantity").notNull(),
    total: integer("total").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (order) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(order.id),
    };
  }
);
export const CartTable = pgTable(
  "cartitem",
  {
    id: serial("id").primaryKey(),
    productId: text("product").notNull(),
    quantity: integer("quantity").notNull(),
    price: integer("price").notNull(),
    userId: text("userId").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    orderId: integer("orderId").references(OrderTable.id),
  },
  (cart) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(cart.id),
    };
  }
);
export type Cart = InferModel<typeof CartTable>;
export type NewCart = InferModel<typeof CartTable, "insert">; // insert type

export type Order = InferModel<typeof OrderTable>;
export type NewOrder = InferModel<typeof OrderTable, "insert">; // insert type

export const getCartTable = async () => {
  const selectResult = await db.select().from(CartTable);
  console.log("Results", selectResult);
};
