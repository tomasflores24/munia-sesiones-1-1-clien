import { Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";

import "./AssignSessionModalStyles.scss";
import {
  useAssignSessions,
  useUpdateAssignSessions,
} from "../../../../../hooks/collaborator/useCollaborator";
import LoadingSpinner from "../../../../../shared/loadingSpinner/LoadingSpinner";

const AssignSessionModal = ({
  open,
  closeModal,
  collaboratorId,
  purchaseId,
  companyId,
  sessionPerColla,
}) => {
  const [sessionsAmount, setSessionsAmount] = useState(0);

  const { isLoading: isLoadingAssignSessions, mutate } = useAssignSessions();

  const { isLoading: isLoadingUpdateAssignSessions, mutate: mutateUpdate } =
    useUpdateAssignSessions();

  useEffect(() => {
    if (sessionPerColla) {
      setSessionsAmount(sessionPerColla.number_sessions);
    }else{
      setSessionsAmount(0)
    }
  }, [sessionPerColla]);


  const onSubmit = (e) => {
    e.preventDefault();
    if (!sessionPerColla?.id) {
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
    } else {
      mutateUpdate(
        {
          id: sessionPerColla.id,
          number_sessions: parseInt(sessionsAmount, 10),
        },
        {
          onSuccess: () => {
            toast.success("Sesiones asignadas correctamennte");
            setSessionsAmount(0)
            closeModal();
          },
          onError: (error) => {
            toast.error(error?.response?.data.error || "Algo salio mal.");
            closeModal();
          },
        }
      );
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={closeModal}
        maxWidth="md"
        className="assignSessionModal__root"
      >
        {isLoadingAssignSessions || isLoadingUpdateAssignSessions ? (
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
  open: PropTypes.bool,
  closeModal: PropTypes.func,
  collaboratorId: PropTypes.string,
  purchaseId: PropTypes.string.isRequired,
  companyId: PropTypes.string.isRequired,
  sessionPerCollaId: PropTypes.string,
};

export default AssignSessionModal;
