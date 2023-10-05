import { useMutation, useQuery, useQueryClient } from "react-query";
import { ProvidersServices } from "../../services/dashboard/providers/providers.services";

const providerKey = "providers";

/**
 * 
 * @param {string | undefined} keyword 
 * @returns useQuery hook from react-query
 */
export function useGetProviders(keyword) {
  return useQuery([providerKey, keyword], () => ProvidersServices.getAllProviders(keyword));
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
