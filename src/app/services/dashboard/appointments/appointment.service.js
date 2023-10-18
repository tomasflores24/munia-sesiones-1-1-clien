import { HttpRequest } from "../../HttpRequest";

export const AppointmentService = {
  updateAppointment: async ({ providerId, body }) =>
    HttpRequest.patch(`/appointment/${providerId}`, body),
  createAppointment: async (body) => HttpRequest.post("/appointment", body),
  getAppointments: async (providerId, CollaboratorId) => {
    let url = `/appointment`;
    if (!CollaboratorId && !providerId) {
      url += `/appointments`;
    } else if (CollaboratorId && !providerId) {
      url += `/appointments?collaboratorId=${CollaboratorId}`;
    } else if (providerId && !CollaboratorId) {
      url += `/${providerId}`;
    }
    return HttpRequest.get(url);
  },
  cancelAppointment: async (id) =>
    HttpRequest.get(`/appointment/cancelAppointment/${id}`),
};
