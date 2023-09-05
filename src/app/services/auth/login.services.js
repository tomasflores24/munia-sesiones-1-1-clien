import { HttpRequest } from "../HttpRequest";

export const loginServices = {
    login: async (data) => await HttpRequest.post("/api/auth", data),
}
