import { HttpRequest } from "../../HttpRequest";

export const CollaboratorsService = {
  getAllCollaborators: async () => HttpRequest.get("/collaborator"),
  getCollaboratorById: async (collaboratorId) => HttpRequest.get(collaboratorId ? `/collaborator/${collaboratorId}` : null),
  deleteCollaborator: async (collaboratorId) =>
    HttpRequest.delete(`/collaborator/${collaboratorId}`),
};
