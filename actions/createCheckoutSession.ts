"use server";

import { Address } from "@/sanity.types";
import { CartItem } from "@/store";

export interface Metadata {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  clerkUserId?: string;
  address?: Address | null;
}

export interface GroupedCartItems {
  product: CartItem["product"];
  quantity: number;
}

/**
 * Placeholder for local payment gateway integration
 *
 * TODO: Implement checkout session creation for your local payment gateway
 * This function should:
 * 1. Create a payment session/transaction with your payment provider
 * 2. Return the payment URL or redirect URL
 * 3. Handle payment metadata and order information
 *
 * @param items - Array of cart items with product and quantity
 * @param metadata - Order metadata including customer info and address
 * @returns Payment URL or checkout URL
 */
export async function createCheckoutSession(
  items: GroupedCartItems[],
  metadata: Metadata
): Promise<string> {
  try {
    // TODO: Replace with your local payment gateway integration
    // Example structure:
    // 1. Calculate total amount
    // 2. Create payment transaction with your gateway
    // 3. Store order information temporarily (if needed)
    // 4. Return payment/checkout URL

    const totalAmount = items.reduce(
      (sum, item) => sum + (item.product?.price || 0) * item.quantity,
      0
    );

    console.log("Checkout session requested:", {
      orderNumber: metadata.orderNumber,
      itemsCount: items.length,
      totalAmount,
      customerEmail: metadata.customerEmail,
    });

    // Placeholder: Return a success page URL
    // Replace this with actual payment gateway integration
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    return `${baseUrl}/success?orderNumber=${metadata.orderNumber}`;

    // Example implementation structure:
    // const paymentResponse = await yourPaymentGateway.createTransaction({
    //   amount: totalAmount,
    //   currency: "MNT", // or your local currency
    //   orderId: metadata.orderNumber,
    //   customerEmail: metadata.customerEmail,
    //   items: items.map(item => ({
    //     productId: item.product._id,
    //     quantity: item.quantity,
    //     price: item.product.price,
    //   })),
    // });
    // return paymentResponse.checkoutUrl;
  } catch (error) {
    console.error("Error creating Checkout Session", error);
    throw error;
  }
}
