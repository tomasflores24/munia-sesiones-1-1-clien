import { HttpRequest } from "../../HttpRequest";

export const ClientsServices = {
  getAllClients: async () => HttpRequest.get("/company"),
};
