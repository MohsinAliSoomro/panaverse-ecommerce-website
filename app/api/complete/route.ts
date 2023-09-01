import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
// import { buffer } from "micro";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});
// const endpointSecret =
//   "whsec_7a050b012603667a044f6f49e493c9f759e84e289ed6ec2ec975091b3feba649";

const endpointSecret = "we_1NlXbAFxAUz38nIubf8ERTl3";
export async function POST(request: NextRequest) {
  try {
    console.log("Start event");
    const body = await request.text();
    console.log("after body", { body });
    const sig = headers().get("stripe-signature")!;
    console.log("after sig", { sig });
    let event: Stripe.Event;
    try {
      if (!sig || !endpointSecret) return;
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
      console.log("INSIDE A EVENT", { event });
    } catch (err) {
      console.log("INSIDE A EVENT CATCH ERROR", { err });
      NextResponse.json(`Webhook Error: ${err}`);
      return;
    }
    console.log("✅ Success:", event.id);
    console.log("AFTER TRY CATCH event", { event });
    switch (event.type) {
      case "checkout.session.async_payment_failed":
        const checkoutSessionAsyncPaymentFailed = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_failed
        break;
      case "checkout.session.async_payment_succeeded":
        const checkoutSessionAsyncPaymentSucceeded = event.data.object;
        // Then define and call a function to handle the event checkout.session.async_payment_succeeded
        break;
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data.object;
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
