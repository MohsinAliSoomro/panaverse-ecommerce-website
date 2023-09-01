import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
// import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const endpointSecret =
      "whsec_7a050b012603667a044f6f49e493c9f759e84e289ed6ec2ec975091b3feba649";
    const sig = headers().get("stripe-signature") as string;
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
      //   console.log("INSIDE A EVENT CATCH ERROR", { err });
      return NextResponse.json(`Webhook Error: ${err}`);
    }
    // console.log("✅ Success:", event.id);
    // console.log("AFTER TRY CATCH event", { event });
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
        const checkoutSessionCompleted = event.data.object;
        console.log({ checkoutSessionCompleted });

        // Then define and call a function to handle the event checkout.session.completed
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    NextResponse.json("RESPONSE EXECUTE");
  } catch (error) {
    return NextResponse.json(
      {
        error: {
          message: `Method Not Allowed`,
        },
      },
      { status: 405 }
    ).headers.set("Allow", "POST");
  }
}
