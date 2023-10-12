import { HttpRequest } from "../../HttpRequest";

export const ProvidersServices = {
  getAllProviders: async ({ keyword, serviceId }) => {
    const queryParams = new URLSearchParams();
    if (keyword) queryParams.append("keyword", keyword);
    if (serviceId) queryParams.append("serviceId", serviceId);
    return HttpRequest.get(`/provider?${queryParams.toString()}`);
  },
  deleteProvider: async (providerId) =>
    HttpRequest.delete(`/provider/${providerId}`),
};
