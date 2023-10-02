import { HttpRequest } from "../../HttpRequest";

export const PurchasesServices = {
  createPurchase: async (data) => HttpRequest.post("/purchase", data),
};
