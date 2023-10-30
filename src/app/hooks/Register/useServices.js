import { useQuery } from "react-query";
import { ServiceServices } from "../../services/auth/service.services";

export function useGetServices() {
  return useQuery(["services"], ServiceServices.getServices, {
    retry: 2,
    refetchOnWindowFocus: false
  });
}

export function useGetProviderServices({ providerId }) {
  return useQuery(["providerServices", providerId], () =>
    ServiceServices.getProviderServices(providerId)
  );
}
