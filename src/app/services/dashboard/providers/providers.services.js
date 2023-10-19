import { HttpRequest } from "../../HttpRequest";

export const ProvidersServices = {
  getProviderById: async (providerId) =>
    HttpRequest.get(providerId ? `/provider/${providerId}` : null),
  updateProvider: async (providerId, body) =>
    HttpRequest.patch(`/provider/${providerId}`, body),
  getInactiveProviders: async () => HttpRequest.get("/provider/is-active"),
  getAllProviders: async ({ keyword, serviceId }) => {
    const queryParams = new URLSearchParams();
    if (keyword) queryParams.append("keyword", keyword);
    if (serviceId) queryParams.append("serviceId", serviceId);
    return HttpRequest.get(`/provider?${queryParams.toString()}`);
  },
  deleteProvider: async (providerId) =>
    HttpRequest.delete(`/provider/${providerId}`),
};
