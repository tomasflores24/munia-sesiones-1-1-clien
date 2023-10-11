import { HttpRequest } from "../HttpRequest";

export const ServiceServices = {
  getServices: async () => HttpRequest.get("/service"),
  getProviderServices: async (providerId) =>
    HttpRequest.get(`/service/provider/${providerId}`),
};
