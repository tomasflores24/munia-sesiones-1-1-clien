import { HttpRequest } from "../../HttpRequest";

export const ClientsServices = {
  getAllClients: async () => HttpRequest.get("/company"),
  getCompaniesById: async (clientId) => HttpRequest.get(clientId ? `/company/${clientId}` : null),
  createClient: async (data) => HttpRequest.post("/company/create", data),
};
