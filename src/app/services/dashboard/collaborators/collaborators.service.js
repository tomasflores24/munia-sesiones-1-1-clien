import { HttpRequest } from "../../HttpRequest";

export const CollaboratorsService = {
  getAllCollaborators: async () => HttpRequest.get("/collaborator"),
  getCollaboratorById: async (collaboratorId) =>
    HttpRequest.get(collaboratorId ? `/collaborator/${collaboratorId}` : null),
  updateCollaborator: async (collaboratorId, body) =>
    HttpRequest.patch(`/collaborator/${collaboratorId}`, body),

  deleteCollaborator: async (collaboratorId) =>
    HttpRequest.delete(`/collaborator/${collaboratorId}`),
  createCollaborator: async (data) =>
    HttpRequest.post("/collaborator/create", data),
  getAllCountries: async () => HttpRequest.get("/countries"),
  assignSessions: async (body) =>
    HttpRequest.patch("/session_per_collaborator/", body),
};
