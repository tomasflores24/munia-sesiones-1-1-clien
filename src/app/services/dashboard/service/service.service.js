import { HttpRequest } from "../../HttpRequest";

export const ServiceServices = {
  getAllServices: async () => HttpRequest.get("/service"),
  createService: async (data) => HttpRequest.post("/service", data),
  updateService: async ({ id, ...data }) =>
    HttpRequest.put(`/service/${id}`, data),
  deleteService: async (id) => HttpRequest.delete(`/service/${id}`),
};
