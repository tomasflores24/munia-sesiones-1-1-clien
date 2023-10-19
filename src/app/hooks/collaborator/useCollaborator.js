import { useMutation, useQuery, useQueryClient } from "react-query";
import { CollaboratorsService } from "../../services/dashboard/collaborators/collaborators.service";

const collaboratorKey = "collaborators";

export function useGetCollaborators({ companyId }) {
  return useQuery([collaboratorKey], () =>
    CollaboratorsService.getAllCollaborators({ companyId })
  );
}

export function useDeleteCollaborator() {
  const queryClient = useQueryClient();
  return useMutation(
    (collaboratorId) => CollaboratorsService.deleteCollaborator(collaboratorId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(collaboratorKey);
      },
    }
  );
}

export function useAssignSessions() {
  const queryClient = useQueryClient();
  return useMutation(CollaboratorsService.assignSessions, {
    onSuccess: () => {
      queryClient.invalidateQueries(collaboratorKey);
    },
  });
}
