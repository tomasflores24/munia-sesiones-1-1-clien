import { HttpRequest } from "../../HttpRequest";

export const PurchasesServices = {
  createPurchase: async (data) => HttpRequest.post("/purchase", data),
  getPurchaseByCompanyId: (companyId) =>
    HttpRequest.get(`/purchase/company/${companyId}`),
};
