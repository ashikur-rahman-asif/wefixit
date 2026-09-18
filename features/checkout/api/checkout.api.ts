import { CheckoutInput } from "../schemas/checkout.schema";
import { AdminOrderDetail } from "@/types/admin";
import api from "@/lib/axios";

export interface OrderItemPayload {
  productId: number;
  quantity: number;
  color: string | null;
}

export interface CreateOrderPayload {
  customerInfo: CheckoutInput;
  orderItems: OrderItemPayload[];
}

export interface StripePaymentData {
  paymentIntentId: string;
  clientSecret: string;
  publishableKey: string;
}

export interface CreateOrderResponse {
  status: string;
  message: string;
  data: {
    order: AdminOrderDetail;
    payment: StripePaymentData | null;
  };
}

export const checkoutApi = {
  createOrder: async (payload: CreateOrderPayload): Promise<CreateOrderResponse> => {
    const response = await api.post<CreateOrderResponse>("/orders", payload);
    return response.data;
  },
};
