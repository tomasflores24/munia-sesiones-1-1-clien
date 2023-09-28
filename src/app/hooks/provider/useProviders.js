import { useMutation, useQuery, useQueryClient } from "react-query";
import { ProvidersServices } from "../../services/dashboard/providers/providers.services";

const providerKey = "providers";

export function useGetProviders() {
  return useQuery([providerKey], ProvidersServices.getAllProviders);
}

export function useDeleteProvider() {
  const queryClient = useQueryClient();
  return useMutation(
    (providerId) => ProvidersServices.deleteProvider(providerId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(providerKey);
      },
    }
  );
}
