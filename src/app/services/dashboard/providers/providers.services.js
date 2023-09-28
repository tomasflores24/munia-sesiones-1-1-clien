import { HttpRequest } from "../../HttpRequest";

export const ProvidersServices = {
  getAllProviders: async () => HttpRequest.get("/provider"),
  deleteProvider: async (providerId) =>
    HttpRequest.delete(`/provider/${providerId}`),
};
