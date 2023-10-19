import { Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";
import { Toaster } from "react-hot-toast";

import "./AssignSessionModalStyles.scss";

const AssignSessionModal = ({ open, closeModal, collaboratorId, isLoading = false }) => {
  const [sessionsAmount, setSessionsAmount] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();
    // TODO: integrar con el back
    console.log({ sessionsAmount, collaboratorId });
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={closeModal}
        maxWidth="md"
        sx={{ "& .MuiDialog-paper": { borderRadius: "25px" } }}
      >
        <form onSubmit={onSubmit} className="createUserModal__form">
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
          <DialogActions className="createUserModal__actions">
            <button
              onClick={closeModal}
              className="clientForm__btn cancel"
              disabled={isLoading}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="clientForm__btn"
              disabled={isLoading}
            >
              Asignar sesiones
            </button>
          </DialogActions>
        </form>
      </Dialog>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};

AssignSessionModal.propTypes = {
  open: PropTypes.func,
  closeModal: PropTypes.func,
  collaboratorId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
};

export default AssignSessionModal;
