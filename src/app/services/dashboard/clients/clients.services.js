import { HttpRequest } from "../../HttpRequest";

export const ClientsServices = {
  getAllClients: async () => HttpRequest.get("/company"),
  createClient: async (data) => HttpRequest.post("/auth", data),
};
