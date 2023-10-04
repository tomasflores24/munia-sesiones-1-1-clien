import { HttpRequest } from "../../HttpRequest";

export const ServiceServices = {
  getAllServices: async () => HttpRequest.get("/service"),
  createService: async (data) => HttpRequest.post("/", data),
  updateService: async (data) => HttpRequest.put("/service/:id", data),
  deleteService: async (data) => HttpRequest.delete("/service/:id", data),
};
