import { HttpRequest } from "../../HttpRequest";

export const AppointmentService = {
  updateAppointment: async ({ providerId, body }) =>
    HttpRequest.patch(`/appointment/${providerId}`, body),
  createAppointment: async (body) => HttpRequest.post("/appointment", body),
  getAppointments: async (CollaboratorId) =>
    HttpRequest.get(
      CollaboratorId
        ? `/appointment/d104e405-9329-4fc5-89f6-c8eeb9f51650?CollaboratorId=${CollaboratorId}`
        : "/appointment/d104e405-9329-4fc5-89f6-c8eeb9f51650"
    ),
  cancelAppointment: async (id) =>
    HttpRequest.get(`/appointment/cancelAppointment/${id}`),
};
