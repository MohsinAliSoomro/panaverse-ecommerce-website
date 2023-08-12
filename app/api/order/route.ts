import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function POST(request: NextRequest) {
  const lineItems = await request.json();
  let successUrl = "";
  if (request.nextUrl.hostname === "localhost") {
    successUrl = "http://localhost:3000/order/success";
  }

  const session = await stripe.checkout.sessions.create({
    success_url: successUrl,
    line_items: lineItems,
    mode: "payment",
    billing_address_collection: "required",
  });

  return NextResponse.json(session);
}