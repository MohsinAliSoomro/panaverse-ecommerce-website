import { CartTable, db } from "@/lib/drizzleOrm";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  const result = db.select().from(CartTable);
  return NextResponse.json({ cart: result });
}
