import { CartTable, OrderTable, db } from "@/lib/drizzleOrm";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // const result = await sql`Select * from orders`;
  const result = await db.select().from(OrderTable);

  console.log({ result });
  return NextResponse.json({ message: result });
}
