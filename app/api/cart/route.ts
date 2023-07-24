import { CartTable, OrderTable, db } from "@/lib/drizzleOrm";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const result = db.select().from(CartTable);
  console.log({ result });
  return NextResponse.json({ result });
}
