import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});
const endpointSecret =
  "whsec_7a050b012603667a044f6f49e493c9f759e84e289ed6ec2ec975091b3feba649";
export async function POST(request: NextRequest) {
  console.log("Start event");
  const body = request.body as any;
  console.log("after body", { body });
  const sig = request.headers.get("stripe-signature") as string;
  console.log("after sig", { sig });
  let event;
  console.log("after event", { event });
  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    NextResponse.json(`Webhook Error: ${err}`);
    return;
  }
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
}