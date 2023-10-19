import { Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";

import "./AssignSessionModalStyles.scss";
import { useAssignSessions } from "../../../../../hooks/collaborator/useCollaborator";
import LoadingSpinner from "../../../../../shared/loadingSpinner/LoadingSpinner";

const AssignSessionModal = ({
  open,
  closeModal,
  collaboratorId,
  purchaseId,
  companyId,
}) => {
  const [sessionsAmount, setSessionsAmount] = useState(0);

  const { isLoading: isLoadingAssignSessions, mutate } = useAssignSessions();

  const onSubmit = (e) => {
    e.preventDefault();

    mutate(
      {
        number_sessions: parseInt(sessionsAmount, 10),
        CompanyId: companyId,
        PurchaseMembershipId: purchaseId,
        CollaboratorId: collaboratorId,
      },
      {
        onSuccess: () => {
          toast.success("Sesiones asignadas correctamennte");
          closeModal();
        },
        onError: (error) => {
          toast.error(error?.response?.data.error || "Algo salio mal.");
          closeModal();
        },
      }
    );
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={closeModal}
        maxWidth="md"
        className="assignSessionModal__root"
      >
        {isLoadingAssignSessions ? (
          <div className="loadingSpinner__container">
            <LoadingSpinner />
          </div>
        ) : (
          <form onSubmit={onSubmit} className="assignSessionModal__form">
            <DialogContent>
              <TextField
                id="outlined-number"
                label="Numero de sesiones"
                type="number"
                fullWidth
                value={sessionsAmount}
                onChange={(e) => setSessionsAmount(e.target.value)}
              />
            </DialogContent>
            <DialogActions className="assignSessionModal__actions">
              <button
                type="button"
                onClick={closeModal}
                className="clientForm__btn cancel"
                disabled={isLoadingAssignSessions}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="clientForm__btn"
                disabled={isLoadingAssignSessions}
              >
                Asignar sesiones
              </button>
            </DialogActions>
          </form>
        )}
      </Dialog>
    </>
  );
};

AssignSessionModal.propTypes = {
  open: PropTypes.func,
  closeModal: PropTypes.func,
  collaboratorId: PropTypes.string.isRequired,
  purchaseId: PropTypes.string.isRequired,
  companyId: PropTypes.string.isRequired,
};

export default AssignSessionModal;
