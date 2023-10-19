import { HttpRequest } from "../../HttpRequest";

export const ServiceServices = {
  getAllServices: async () => HttpRequest.get("/service"),
  createService: async (data) => HttpRequest.post("/service", data),
  updateService: async ({ id, ...data }) =>
    HttpRequest.put(`/service/${id}`, data),
  deleteService: async (id) => HttpRequest.delete(`/service/${id}`),
  getAllCategory: async () => HttpRequest.get("/category"),
  getServicesByCategoryId: async (categoryId) =>
    HttpRequest.get(
      categoryId ? `/service?CategoryId=${categoryId}` : "/service/"
    ),
  createCategory: async (data) => HttpRequest.post("/category", data),
  editCategory: async ({ CategoryId, data }) =>
    HttpRequest.put(`/category/${CategoryId}`, data),
};
