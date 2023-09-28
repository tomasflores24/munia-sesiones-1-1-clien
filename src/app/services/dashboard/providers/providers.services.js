import { HttpRequest } from "../../HttpRequest";

export const ProvidersServices = {
  getAllProviders: async () => HttpRequest.get("/provider"),
  deleteProvider: async (userId) => HttpRequest.delete(`/provider/${userId}`),
};
