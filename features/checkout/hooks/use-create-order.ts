import { useMutation } from "@tanstack/react-query";
import { checkoutApi, CreateOrderPayload, CreateOrderResponse } from "../api/checkout.api";

export const useCreateOrder = () => {
  return useMutation<CreateOrderResponse, Error, CreateOrderPayload>({
    mutationFn: checkoutApi.createOrder,
  });
};
