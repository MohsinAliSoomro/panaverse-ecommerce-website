import { db,  CartTable } from "@/lib/drizzleOrm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // const result = await db.select().from(CartTable);
    // console.log({result})
    return NextResponse.json({  }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
