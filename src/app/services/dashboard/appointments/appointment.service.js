import { HttpRequest } from "../../HttpRequest";

export const AppointmentService = {
  getAllAppointments: async () => HttpRequest.get("/collaborator"),
  updateAppointment: async ({ providerId, body }) =>
    HttpRequest.patch(`/appointment/${providerId}`, body),
  createAppointment: async (body) => HttpRequest.post("/appointment", body),
};
