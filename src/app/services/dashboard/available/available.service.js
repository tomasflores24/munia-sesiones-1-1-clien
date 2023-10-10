import { HttpRequest } from "../../HttpRequest";

export const AvailableService = {
  getAllByProviderId: async (providerId) =>
    HttpRequest.get(`/available/${providerId}`),
};
