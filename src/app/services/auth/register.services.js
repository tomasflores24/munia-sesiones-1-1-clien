import { HttpRequest } from "../HttpRequest";

export const RegisterServices = {
  signUp: async (data) => HttpRequest.post("/auth/sign-up", data),
};
