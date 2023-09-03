import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { OrderTable, db } from "@/lib/drizzleOrm";
import { headers } from "next/headers";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function POST(request: NextRequest) {
  const body = await request.text();
  const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK_KEY!;
  const sig = headers().get("stripe-signature") as string;
  console.log({ sig, endpointSecret });
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.log({ err });
    return NextResponse.json(`Webhook Error: ${err}`);
  }
  // const session = event.data.object as Stripe.Checkout.SessionsResource;

  console.log({ event });
  switch (event.type) {
    case "checkout.session.async_payment_failed":
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      console.log({ checkoutSessionAsyncPaymentFailed });
      // Then define and call a function to handle the event checkout.session.async_payment_failed
      break;
    case "checkout.session.async_payment_succeeded":
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      console.log({ checkoutSessionAsyncPaymentSucceeded });

      // Then define and call a function to handle the event checkout.session.async_payment_succeeded
      break;
    case "checkout.session.completed":
      const checkoutSessionCompleted: any = event.data.object;
      const response1 = await db
        .insert(OrderTable)
        .values({
          userId: checkoutSessionCompleted?.metadata.userId,
          itemCount: 1,
          total: checkoutSessionCompleted?.amount_total as any,
          isComplete: true,
        })
        .returning();
      console.log({ response1 });
      // Then define and call a function to handle the event checkout.session.completed
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return NextResponse.json({ message: "RESPONSE EXECUTE", data: event });
}
