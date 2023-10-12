import { HttpRequest } from "../../HttpRequest";

export const ProvidersServices = {
  getAllProviders: async (keyword) =>
    HttpRequest.get(`/provider${keyword ? "?keyword=" + keyword : ""}`),
  getProviderById: async (providerId) => 
    HttpRequest.get(providerId ? `/provider/${providerId}` : "/provider"),
  deleteProvider: async (providerId) =>
    HttpRequest.delete(`/provider/${providerId}`),
};
