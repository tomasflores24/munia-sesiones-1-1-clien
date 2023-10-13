import { HttpRequest } from "../../HttpRequest";

export const ProvidersServices = {
  getAllProviders: async (keyword) =>
    HttpRequest.get(`/provider${keyword ? "?keyword=" + keyword : ""}`),
  getProviderById: async (providerId) => 
    HttpRequest.get(providerId ? `/provider/${providerId}` : "/provider"),
  getAllProviders: async ({ keyword, serviceId }) => {
    const queryParams = new URLSearchParams();
    if (keyword) queryParams.append("keyword", keyword);
    if (serviceId) queryParams.append("serviceId", serviceId);
    return HttpRequest.get(`/provider?${queryParams.toString()}`);
  },
  deleteProvider: async (providerId) =>
    HttpRequest.delete(`/provider/${providerId}`),
};
