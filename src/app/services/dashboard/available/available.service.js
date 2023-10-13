import { HttpRequest } from "../../HttpRequest";

export const AvailableService = {
  getAllByProviderId: async ({ providerId, page = 1 }) =>
    HttpRequest.get(`/available/getAvailabilityCalendar/${providerId}?page=${page}`),
};
