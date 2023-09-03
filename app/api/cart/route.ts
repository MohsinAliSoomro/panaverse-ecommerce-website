import { CartTable, OrderTable, db } from "@/lib/drizzleOrm";
import { getAuth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user = getAuth(request);

  const result = await db
    .select()
    .from(CartTable)
    .where(eq(CartTable.userId, user.userId as string));

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  const { userId } = getAuth(request);
  const { price, productId, quantity = 1 } = await request.json();

  const checkIfItemExists = await db
    .select()
    .from(CartTable)
    .where(
      and(
        eq(CartTable.productId, productId),
        eq(CartTable.userId, userId as string)
      )
    );

  if (checkIfItemExists.length > 0) {
    return NextResponse.json({ exist: true });
  }
  const response = await db
    .insert(CartTable)
    .values({
      price,
      productId,
      quantity,
      userId: userId as string,
    })
    .returning();
  return NextResponse.json(response);
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("cartId");
  const response = await db
    .delete(CartTable)
    .where(eq(CartTable.id, Number(id)))
    .returning();

  return NextResponse.json(response);
}
