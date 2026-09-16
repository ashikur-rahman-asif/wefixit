import { publicServicesApi } from "@/features/services/api/public-services.api";
import { useQuery } from "@tanstack/react-query";

export const usePublicServices = () => {
  return useQuery({
    queryKey: ["publicServices"],
    queryFn: publicServicesApi.getServices,
    staleTime: 1000 * 60 * 20,
  });
};
