import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { OrderTable, db } from "@/lib/drizzleOrm";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const endpointSecret = process.env.STRIPE_SECRET_WEBHOOK_KEY!;
    const sig = request.headers.get("stripe-signature") as string;
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
      return NextResponse.json(`Webhook Error: ${err}`);
    }

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
        const checkoutSessionCompleted = event.data.object;
        const response1 = await db
          .insert(OrderTable)
          .values({
            userId: "user1",
            itemCount: 1,
            total: 0,
            isComplete: true,
          })
          .returning();
        console.log({ response1 });
        // Then define and call a function to handle the event checkout.session.completed
        break;
      case "payment_intent.created":
        console.log("payment intent create", event.data);
        // ... handle other event types
        break;
      case "payment_intent.succeeded":
        console.log("payment intent success", event.data);
        break;
      case "charge.succeeded":
        const response = await db
          .insert(OrderTable)
          .values({
            userId: "user1",
            itemCount: 1,
            total: 0,
            isComplete: true,
          })
          .returning();
        console.log("charge success intent success", response);

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    return NextResponse.json("RESPONSE EXECUTE");
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          message: `Method Not Allowed`,
        },
      },
      { status: 405 }
    );
  }
}
