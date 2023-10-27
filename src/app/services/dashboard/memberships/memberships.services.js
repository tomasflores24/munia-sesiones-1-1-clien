import { HttpRequest } from "../../HttpRequest";

export const MembershipsServices = {
  getAllMemberships: async () => await HttpRequest.get("/membership"),
  postMembership: async (data) => HttpRequest.post("/membership", data),
};
