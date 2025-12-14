import { Metadata } from "@/actions/createCheckoutSession";
import { backendClient } from "@/sanity/lib/backendClient";
import { NextRequest, NextResponse } from "next/server";

/**
 * Webhook endpoint for payment gateway callbacks
 *
 * TODO: Implement webhook handler for your local payment gateway
 * This endpoint should:
 * 1. Verify webhook signature/authenticity
 * 2. Handle payment success/failure events
 * 3. Create orders in Sanity when payment is successful
 * 4. Update stock levels
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // TODO: Verify webhook signature/authenticity
    // Example:
    // const signature = req.headers.get("x-payment-signature");
    // const isValid = verifyWebhookSignature(body, signature);
    // if (!isValid) {
    //   return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    // }

    // TODO: Handle payment events based on your gateway's webhook structure
    // Example structure:
    // if (body.event === "payment.success" || body.status === "completed") {
    //   await createOrderInSanity(body);
    // }

    console.log("Webhook received:", body);

    // Placeholder response
    return NextResponse.json({
      received: true,
      message: "Webhook endpoint ready for local payment gateway integration",
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 400 }
    );
  }
}

/**
 * Helper function to create order in Sanity after successful payment
 * TODO: Adapt this to work with your payment gateway's webhook payload
 */
async function createOrderInSanity(paymentData: any) {
  // TODO: Extract order data from your payment gateway's webhook payload
  // Example:
  // const {
  //   orderNumber,
  //   customerEmail,
  //   customerName,
  //   clerkUserId,
  //   totalAmount,
  //   currency,
  //   paymentId,
  //   items,
  //   address,
  // } = paymentData;

  // Create Sanity product references
  // const sanityProducts = items.map((item: any) => ({
  //   _key: crypto.randomUUID(),
  //   product: {
  //     _type: "reference",
  //     _ref: item.productId,
  //   },
  //   quantity: item.quantity,
  // }));

  // Create order in Sanity
  // const order = await backendClient.create({
  //   _type: "order",
  //   orderNumber,
  //   paymentId, // Replace stripeCheckoutSessionId with paymentId
  //   customerName,
  //   email: customerEmail,
  //   clerkUserId,
  //   currency,
  //   products: sanityProducts,
  //   totalPrice: totalAmount,
  //   status: "paid",
  //   orderDate: new Date().toISOString(),
  //   address: address ? {
  //     state: address.state,
  //     zip: address.zip,
  //     city: address.city,
  //     address: address.address,
  //     name: address.name,
  //   } : null,
  // });

  // Update stock levels
  // await updateStockLevels(items);

  return { success: true };
}

/**
 * Helper function to update stock levels after order creation
 */
async function updateStockLevels(
  items: { productId: string; quantity: number }[]
) {
  for (const { productId, quantity } of items) {
    try {
      const product = await backendClient.getDocument(productId);

      if (!product || typeof product.stock !== "number") {
        console.warn(
          `Product with ID ${productId} not found or stock is invalid.`
        );
        continue;
      }

      const newStock = Math.max(product.stock - quantity, 0);

      await backendClient.patch(productId).set({ stock: newStock }).commit();
    } catch (error) {
      console.error(`Failed to update stock for product ${productId}:`, error);
    }
  }
}
