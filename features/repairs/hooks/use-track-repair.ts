import { publicRepairsApi } from "@/features/repairs/api/public-repairs.api";
import { TrackRepairResponse } from "@/features/repairs/types/repair.types";
import { useQuery } from "@tanstack/react-query";

export const useTrackRepair = (orderId: string) => {
  return useQuery<TrackRepairResponse, Error>({
    queryKey: ["trackRepair", orderId],
    queryFn: () => publicRepairsApi.trackRepair(orderId),
    enabled: !!orderId, 
    retry: false, 
  });
};
