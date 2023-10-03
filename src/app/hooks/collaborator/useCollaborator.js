import { useMutation, useQuery, useQueryClient } from "react-query";
import { CollaboratorsService } from "../../services/dashboard/collaborators/collaborators.service";

const collaboratorKey = "collaborators";

export function useGetCollaborators() {
  return useQuery([collaboratorKey], CollaboratorsService.getAllCollaborators);
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
