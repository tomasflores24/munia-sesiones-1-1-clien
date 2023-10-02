import { useQuery } from "react-query";
import { ServiceServices } from "../../services/auth/service.services";

export function useGetServices() {
  return useQuery(["services"], ServiceServices.getServices);
}
