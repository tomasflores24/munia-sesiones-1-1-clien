import { HttpRequest } from "../HttpRequest";

export const loginServices = {
  login: async (data) => HttpRequest.post("/login", data),
};
