import { HttpRequest } from "../../HttpRequest";

export const CategoriesServices = {
  getAllCategories: async () => HttpRequest.get("/category"),
};
