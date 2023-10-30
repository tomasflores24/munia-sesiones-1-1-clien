import { HttpRequest } from "../../HttpRequest";

export const CountriesServices = {
  getAllCountries: async () => HttpRequest.get("/countries"),
};
