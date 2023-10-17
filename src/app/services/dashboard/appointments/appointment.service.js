import { HttpRequest } from "../../HttpRequest";

export const AppointmentService = {
  updateAppointment: async ({ providerId, body }) =>
    HttpRequest.patch(`/appointment/${providerId}`, body),
  createAppointment: async (body) => HttpRequest.post("/appointment", body),
  getAppointments: async (providerId, CollaboratorId) =>
    await HttpRequest.get(
      CollaboratorId
        ? `/appointment/appointments?collaboratorId=${CollaboratorId}`
        : `/appointment/${providerId}`
    ),
  cancelAppointment: async (id) =>
    HttpRequest.get(`/appointment/cancelAppointment/${id}`),
};
