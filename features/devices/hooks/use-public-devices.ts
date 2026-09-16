import { publicDevicesApi } from "@/features/devices/api/public-devices.api";
import { useQuery } from "@tanstack/react-query";

export const usePublicDevices = () => {
  return useQuery({
    queryKey: ["publicDevices"],
    queryFn: publicDevicesApi.getDevices,
    staleTime: 1000 * 60 * 20, 
  });
};
