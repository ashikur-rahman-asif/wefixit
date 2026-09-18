import { useQuery } from "@tanstack/react-query";
import { publicOrdersApi, TrackOrderPayload, TrackOrderResponse } from "../api/public-orders.api";

export const useTrackOrder = (payload: TrackOrderPayload) => {
  return useQuery<TrackOrderResponse, Error>({
    queryKey: ["trackOrder", payload.reference, payload.email],
    queryFn: () => publicOrdersApi.trackOrder(payload),
    enabled: !!payload.reference && !!payload.email,
    retry: false,
  });
};
