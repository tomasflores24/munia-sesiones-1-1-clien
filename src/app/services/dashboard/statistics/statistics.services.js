import { HttpRequest } from "../../HttpRequest";

export const StatisticsServices = {
  getAllServices: async () =>
    HttpRequest.get(
      "/statistics/services?startDate=2023-08-01&endDate=2023-09-30&CompanyId=dd9f7f2b-9ca9-469d-a6b0-6487993a7c3e"
    ),

  getAllCategories: async () => HttpRequest.get("/category"),

  getAllCollaborators: async () => HttpRequest.get("/collaborator"),
  getAllCompanies: async () => HttpRequest.get("/company"),
  getAllProvider: async () => HttpRequest.get("/provider"),
  getAllUsers: async () => HttpRequest.get("/statistics/users"),
};
