import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { OrderTable, db } from "@/lib/drizzleOrm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function POST(request: NextRequest) {
  const { lineItems, userId } = await request.json();
  let successUrl = `${process.env.NEXT_PUBLIC_BASE_URL_API}/order/success`;

  const session = await stripe.checkout.sessions.create({
    success_url: successUrl,
    line_items: lineItems,
    mode: "payment",
    billing_address_collection: "required",
    metadata: {
      userId: userId,
    },
  });

  return NextResponse.json(session);
}
