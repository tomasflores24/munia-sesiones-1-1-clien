import { HttpRequest } from "../../HttpRequest";

export const ClientsServices = {
  getAllClients: async () => HttpRequest.get("/company"),
  getCompaniesById: async (clientId) => HttpRequest.get(clientId ? `/company/${clientId}` : null),
  updateClient: async (clientId, body) =>
    HttpRequest.patch(`/company/${clientId}`, body),
  createClient: async (data) => HttpRequest.post("/company/create", data),
};
