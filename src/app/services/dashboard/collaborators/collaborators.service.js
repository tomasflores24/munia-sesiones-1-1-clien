import { HttpRequest } from "../../HttpRequest";

export const CollaboratorsService = {
  getAllCollaborators: async () => HttpRequest.get("/collaborator"),
  deleteCollaborator: async (collaboratorId) =>
    HttpRequest.delete(`/collaborator/${collaboratorId}`),
  createCollaborator: async (data) =>
    HttpRequest.post("/collaborator/create", data),
};
