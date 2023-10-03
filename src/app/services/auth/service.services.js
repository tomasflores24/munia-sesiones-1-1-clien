import { HttpRequest } from "../HttpRequest";

export const ServiceServices = {
  getServices: async () => HttpRequest.get("/service"),
};
