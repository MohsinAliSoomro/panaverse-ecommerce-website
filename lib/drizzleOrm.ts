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
export const CartTable = pgTable(
  "cart",
  {
    id: serial("id").primaryKey(),
    product: text("product").notNull(),
    quantity: integer("quantity").notNull(),
    price: integer("price").notNull(),
    total: integer("total").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (cart) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(cart.product),
    };
  }
);

export type Cart = InferModel<typeof CartTable>;
export type NewCart = InferModel<typeof CartTable, "insert">; // insert type

export const getCartTable = async () => {
  const selectResult = await db.select().from(CartTable);
  console.log("Results", selectResult);
};
