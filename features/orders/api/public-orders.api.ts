import { AdminOrderDetail } from "@/types/admin";
import api from "@/lib/axios";

export interface TrackOrderPayload {
  reference: string;
  email: string;
}

export interface TrackOrderResponse {
  status: string;
  message: string;
  data: AdminOrderDetail;
}

export const publicOrdersApi = {
  trackOrder: async (payload: TrackOrderPayload): Promise<TrackOrderResponse> => {
    const response = await api.post<TrackOrderResponse>("/orders/track", payload);
    return response.data;
  },
};
