import { HttpRequest } from "../../HttpRequest";

export const ProvidersServices = {
  getAllProviders: async (keyword) =>
    HttpRequest.get(`/provider${keyword ? "?keyword=" + keyword : ""}`),
  deleteProvider: async (providerId) =>
    HttpRequest.delete(`/provider/${providerId}`),
};
